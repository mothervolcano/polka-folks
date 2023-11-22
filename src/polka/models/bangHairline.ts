import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class BangHairline extends Model {


	constructor( field: any, radius: number, type?: string ) {

		super( field, radius, type );

		return this;

	}


	public configure() {

		this.level = 3;

	}


	public plot( params: any, lvl: number, PIN_A: string, PIN_B: string, c: number ) {

		const { hairlineLevelCtrl, hairlineRidgeCtrl } = params;

		// .............................................
		// Compute parameters

		const dist = 75;

		// .............................................
		// Key points

		const A = this.base.A;
		const B = this.base.B;

		// .............................................
		// Construction


		// const field = new OrbitalField( this.field.attractor.center, this.field.attractor.radius );

		const A1 	= this.field.attractor.locate(A.position+0.075).offsetBy( -15, 'RAY' ).steer(130).scaleHandles( 0, true, false ).scaleHandles( 2/3, false, true );
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

		this.composer.init();
		this.composer.addPath(this.path, lvl);
		return this.composer.wrap();

		// const instructions = {

		// 	level: this.level,
		// 	complete: true,
		// 	gradient: null

		// }

		// return [ instructions, this.path ];

	}
}


let instance: BangHairline | null = null;

export function drawBangHairline( field: any, radius: number, type?: string ): BangHairline {
  
  if (!instance) {

    instance = new BangHairline( field, radius, type );
  }

  return instance;
}