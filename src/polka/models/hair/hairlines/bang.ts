import { Path } from 'paper';

import { markPoint } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class BangHairline extends Model {


	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "bang hairline"

		return this;

	}


	public configure() {

	}


	public plot( params: any, PIN_A: string, PIN_B: string, c: number ) {

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


		// const att = new OrbitalField( this.base.attractor.center, this.base.attractor.radius );

		const A1 	= this.base.attractor.locate(A.position+0.075).offsetBy( -15, 'RAY' ).steer(130).scaleHandles( 0, true, false ).scaleHandles( 2/3, false, true );
		const C 	= this.base.attractor.locate(c).offsetBy( dist * -1, 'RAY' ).scaleHandles( 2/3 );

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

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(this.path, formaProps);

		
		return this.composer.wrap();

	}
}


let instance: IModel | null = null;

export function drawBangHairline( base: IModel, type?: string ): IModel {
  
  if (!instance) {

    instance = new BangHairline( base, type ) as IModel;
  }

  return instance;
}