import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class MozartHairline extends Model {


	
	constructor( field: any, radius: number, type?: string ) {

		super( field, radius, type );

	}


	public configure() {

		this.level = 2;
	}


	public plot( params: any, lvl: number, PIN_A: string, PIN_B: string, c: number ) {

		const { hairlineLevelCtrl, hairlineRidgeCtrl } = params;

		const cuspDist = 40;
		const inletSize = 60;
		const span = 0.10

		// .............................................
		// Key points

		const A = this.base.getPin( PIN_A );
		const B = this.base.getPin( PIN_B );

		const C = this.field.attractor.locate(c);

		const field = new OrbitalField( this.field.attractor.center, this.radius );
		const attL = new Orbital( [ inletSize * 0.75, inletSize * 1 ] );
		const attR = new Orbital( [ inletSize * 0.75, inletSize * 1 ] );

		field.addAttractors( [ attL, attR ] );

		field.compress( 0.25 - span, 0.25 + span );
		field.expandBy( inletSize * 1/8, 'RAY' );

		A.steer( 80, 180 ).scaleHandles(0, true, false );
		C.offsetBy( cuspDist * -1, 'RAY' ).steer(0, 60).scaleHandles(1/5);

		const P1 = attL.locate( 0 ).scaleHandles( 4/3 );


		// ..............................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 3

		});

		this.pen.setPath( this.path );
		this.pen.add( [ A, P1, C ] );
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


let instance: MozartHairline | null = null;

export function drawMozartHairline( field: any, radius: number, type?: string ): MozartHairline {
  
  if (!instance) {

    instance = new MozartHairline( field, radius, type );
  }

  return instance;
}