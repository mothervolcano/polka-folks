import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve } from '../../lib/topo/tools/stitcher';

import { markPoint, traceSegment } from '../../lib/topo/utils/helpers';
import { IModel } from '../types';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairCap extends Model {

	
	constructor( base: IModel, type?: string ) {

		super( base, type );

		return this;

	}


	public configure() {

		this.level = 2;

	};


	public plot( params: any, lvl: number ) {


		// .............................................
		// Compute parameters

		const d = measure( this.base.A, this.base.B );

		// .............................................
		// Key points

		const A = this.base.A.clone().steer(-15, 180);
		const B = this.base.B.clone().steer(15, 180);

		const C = mid( A, B ).offsetBy( d * this.PHILESSER * -1, 'VER' );
		C.flip();

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


		// .............................................
		// Chart

		this.A = this.base.A;
		this.B = this.base.B;

		const formaProps = {
			level: lvl,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(this.path, formaProps);

		return this.composer.wrap();

	};
}


let instance: IModel | null = null;

export function drawHairCap( base: any, type?: string ): IModel {
  
  if (!instance) {

    instance = new HairCap( base, type ) as IModel;
  }

  return instance;
}