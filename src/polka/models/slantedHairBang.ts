import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, iron } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class SlantedHairBang extends Model {

	
	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	}


	public configure() {

		this.level = 0;

	};


	public plot( params: any, lvl: number ) {


		// .............................................
		// Compute parameters

		const position = genRandomDec( 0.28, 0.40 );
		const angle = genRandomDec( -15, 15 ); // TODO: implement later

		const length = this.base.radius + this.PHI.L + this.SIN.XS;
		const advance = this.base.radius + this.PHI.L;

		// .............................................
		// Key points

		const C = this.field.attractor.locate( position );


		// .............................................
		// Construction


		// .............................................
		// Configure




		// .............................................
		// Plotting

		const P0 = merge( C.clone(), C.clone().steer( 90, 180 ) );
		const P1 = C.clone().offsetBy( -length, 'RAY' ).offsetBy( -advance, 'TAN' );
		const P2 = P1.clone().offsetBy( length*this.PHILESSER, 'RAY' ).steer(-90, 180);
		const P3 = C.clone().offsetBy( -advance * this.PHILESSER, 'TAN' );
		const P4 = C.clone().offsetBy( -length, 'RAY' );

		iron( P1, P2 );
		iron( P0, P4 );


		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		});

		this.pen.setPath( this.path );
		this.pen.add( [ P1, P2, P3, P0, P4 ] );


		const instructions = {

			level: this.level,
			complete: false,
			gradient: null
		}

		// .............................................
		// Chart

		this.A = P1;
		this.B = P4;

		return [ instructions, this.path ];

	};
}


let instance: SlantedHairBang | null = null;

export function drawSlantedHairBang( field: any, radius: number ): SlantedHairBang {
  
  if (!instance) {

    instance = new SlantedHairBang( field, radius );
  }

  return instance;
}