import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class MozartHairline extends BaseModel {


	
	constructor( field: any, radius: number ) {

		super( field, radius );

	}


	public configure() {

		this.level = 2;
	}


	public plot( params: any, PIN_A: string, PIN_B: string, c: number ) {

		const { hairlineLevelCtrl, hairlineRidgeCtrl } = params;

		const cuspDist = 40;
		const inletSize = 60;
		const span = 0.10

		// .............................................
		// Key points

		const A = this.owner.getPin( PIN_A );
		const B = this.owner.getPin( PIN_B );

		const C = this.field.attractor.locate(c);

		const field = new OrbitalField( this.field.attractor.center, this.field.attractor.radius );
		const attL = new Orbital( [0,0], [ inletSize * 0.75, inletSize * 1 ] );
		const attR = new Orbital( [0,0], [ inletSize * 0.75, inletSize * 1 ] );

		field.addAttractors( [ attL, attR ] );

		field.compress( 0.25 - span, 0.25 + span );
		field.expandBy( inletSize * 1.0 * -1, 'RAY' );

		A.steer( 80, 180 );
		C.offsetBy( cuspDist * -1, 'RAY' ).steer(0, 60).scaleHandles(1/5);

		const P1 = attL.locate( 0 ).scaleHandles( 4/3 );


		// ..............................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2

		});

		this.pen.setPath( this.path );
		this.pen.add( [ A, P1, C ] );
		this.pen.mirrorRepeat('HOR');

		const headWrap = field.attractor.extractPath( this.path.firstSegment, this.path.lastSegment );
		headWrap.reverse();
		this.pen.trim( headWrap );
		this.path.join(headWrap);

		// ..............................................


		const instructions = {

			level: this.level,
			complete: true,
			gradient: null
		}

		return [ instructions, this.path ];
	}
}


let instance: MozartHairline | null = null;

export function drawMozartHairline( field: any, radius: number ): MozartHairline {
  
  if (!instance) {

    instance = new MozartHairline( field, radius );
  }

  return instance;
}