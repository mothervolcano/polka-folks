import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Hairline extends Model {


	private _ridge: number = 0;


	constructor( field: any, radius: any, type?: string ) {

		super( field, radius, type );

	};


	configure( levelBaseValue: number, ridgeBaseValue: number ) {

		this.level = 2;
		
		this._ridge = ridgeBaseValue;

	};

	
	plot( params: any, lvl: number, PIN_A: string, PIN_B: string, c: number ) {

		const { hairlineLevelCtrl, hairlineRidgeCtrl } = params;

		// .............................................
		// Compute parameters

		const advance = this.PHI.XL;

		// .............................................
		// Key points

		const A = this.base.getPin( PIN_A );
		const B = this.base.getPin( PIN_B );
		
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

		this.composer.init();
		this.composer.addPath(this.path, lvl);
		return this.composer.wrap();

		// const instructions = {

		// 	level: this.level,
		// 	complete: true,
		// 	gradient: null
		// }

		// return [ instructions, this.path ];
		
	};

}


let instance: Hairline | null = null;

export function drawHairline( field: any, radius: any, type?: string ): Hairline {
  
  if (!instance) {
    instance = new Hairline( field, radius, type ); 
  }

  return instance;
}

