import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Hairline extends BaseModel {


	private _ridge: number;


	constructor( field: any, radius: any ) {

		super( field, radius );

	};


	configure( levelBaseValue: number, ridgeBaseValue: number ) {

		this.level = 2;
		
		this._ridge = ridgeBaseValue;

	};

	
	plot( params: any, PIN_A: string, PIN_B: string, c: number ) {

		const { hairlineLevelCtrl, hairlineRidgeCtrl } = params;

		// .............................................
		// Compute parameters

		const advance = this.PHI.XL;

		// .............................................
		// Key points

		const A = this.owner.getPin( PIN_A );
		const B = this.owner.getPin( PIN_B );
		
		const C = this.field.attractor.locate(0.25);
		
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

		const instructions = {

			level: this.level,
			complete: true,
			gradient: null
		}

		return [ instructions, this.path ];
		
	};

}


let instance: Hairline | null = null;

export function drawHairline( field: any, radius: any ): Hairline {
  
  if (!instance) {
    instance = new Hairline( field, radius ); 
  }

  return instance;
}

