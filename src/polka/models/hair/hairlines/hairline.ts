import { Path } from 'paper';

import Model from 'polka/core/model';

import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';

import { markPoint } from 'lib/topo/utils/helpers';
import { IModel } from 'polka/types';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Hairline extends Model {


	private _ridge: number = 0;


	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "hairline";

	};


	configure( levelBaseValue: number, ridgeBaseValue: number ) {

		this._ridge = ridgeBaseValue;

	};

	
	plot( params: any, PIN_A: string, PIN_B: string, c: number ) {

		const { hairlineLevelCtrl, hairlineRidgeCtrl } = params;

		// .............................................
		// Compute parameters

		const advance = this.PHI.XL;

		// .............................................
		// Key points

		const A = this.base.getPin( PIN_A );
		const B = this.base.getPin( PIN_B );
		
		const C = this.base.attractor.locate(0.25);
		
		C.offsetBy( advance, 'VER' );


		// ..............................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( this.path );
		this.pen.add( [ A, C, B ] );

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

	};
}


let instance: IModel | null = null;

export function drawHairline( base: IModel, type?: string ): IModel {
  
  if (!instance) {
    instance = new Hairline( base, type ) as IModel; 
  }

  return instance;
}

