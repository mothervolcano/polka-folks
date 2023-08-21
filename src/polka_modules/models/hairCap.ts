import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve } from '../../lib/topo/tools/stitcher';

import { markPoint, traceSegment } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairCap extends Model {

	
	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	}


	public configure() {

		this.level = 2;

	};


	public plot( params: any ) {


		// .............................................
		// Compute parameters

		const d = measure( this.owner.A, this.owner.B );

		// .............................................
		// Key points

		const A = this.owner.A.clone().steer(-15, 180);
		const B = this.owner.B.clone().steer(15, 180);

		const C = mid( A, B ).offsetBy( d * this.PHILESSER * -1, 'VER' );

		// .............................................
		// Construction



		// .............................................
		// Configure




		// .............................................
		// Plotting

		curve( A, C, 1, 2/3 );
		curve( C, B, 1, 2/3 );


		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: false
		});

		this.pen.setPath( this.path );
		this.pen.add( [ A, C, B ] );
		// this.pen.mirrorRepeat('HOR');

		const instructions = {

			level: this.level,
			complete: false,
			gradient: null
		}

		// .............................................
		// Chart

		this.A = this.owner.A;
		this.B = this.owner.B;

		return [ instructions, this.path ];

	};
}


let instance: HairCap | null = null;

export function drawHairCap( field: any, radius: number ): HairCap {
  
  if (!instance) {

    instance = new HairCap( field, radius );
  }

  return instance;
}