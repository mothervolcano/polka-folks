import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';
import { IModel } from '../types';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class MozartHairline extends Model {

	constructor( base: IModel, type?: string ) {

		super( base, type );

	}


	public configure() {

	}


	public plot( params: any, PIN_A: string, PIN_B: string, c: number ) {

		const { hairlineLevelCtrl, hairlineRidgeCtrl } = params;

		const cuspDist = 40;
		const inletSize = 60;
		const span = 0.10

		// .............................................
		// Key points

		const A = this.base.getPin( PIN_A );
		const B = this.base.getPin( PIN_B );

		const C = this.base.attractor.locate(c);

		const field = new OrbitalField( this.base.attractor.center, this.PHI.BASE );
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

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(this.path, formaProps);
		
		// ..............................................
		
		return this.composer.wrap();

	}
}


let instance: IModel | null = null;

export function drawMozartHairline( base: IModel, type?: string ): IModel {
  
  if (!instance) {

    instance = new MozartHairline( base, type ) as IModel;
  }

  return instance;
}