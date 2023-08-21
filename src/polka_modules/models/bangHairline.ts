import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class BangHairline extends Model {


	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	}


	public configure() {

		this.level = 3;

	}


	public plot( params: any, PIN_A: string, PIN_B: string, c: number ) {

		const { hairlineLevelCtrl, hairlineRidgeCtrl } = params;

		// .............................................
		// Compute parameters

		const dist = 75;

		// .............................................
		// Key points

		const A = this.owner.A;
		const B = this.owner.B;

		// .............................................
		// Construction


		// const field = new OrbitalField( this.field.attractor.center, this.field.attractor.radius );

		const A1 	= this.field.attractor.locate(A.position+0.05).offsetBy( -15, 'RAY' ).steer(150, 180).scaleHandles( 0, true, false ).scaleHandles( 2/3, false, true );
		const C 	= this.field.attractor.locate(c).offsetBy( dist * -1, 'RAY' ).scaleHandles( 2/3 );

		// ..............................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2

		});

		this.pen.setPath( this.path );
		this.pen.add( [ A, A1, C  ] );
		this.pen.mirrorRepeat('HOR');
		
		this.wrap( this.path.firstSegment, this.path.lastSegment );
		

		// ..............................................

		const instructions = {

			level: this.level,
			complete: true,
			gradient: null

		}

		return [ instructions, this.path ];

	}
}


let instance: BangHairline | null = null;

export function drawBangHairline( field: any, radius: number ): BangHairline {
  
  if (!instance) {

    instance = new BangHairline( field, radius );
  }

  return instance;
}