import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairCapeTail extends BaseModel {

	private _volume: number;
	private _elevation: number;
	private _length: number;

	constructor( field: any, radius: number ) {

		super( field, radius );

	};


	public configure( elevationBaseValue ) {

		this.level = 0;

		this._volume = this.SIN.XL;
		this._elevation = elevationBaseValue;
		this._length = this.PHI.XL;

	};


	public plot( params: any ) {


		// .............................................
		// Compute parameters

		const length = this.PHI.XL;

		// .............................................
		// Key points

		const A = this.owner.A;
		const B = this.owner.B;

		const A1 = A.clone().offsetBy( length, 'VER' );
		const B1 = B.clone().offsetBy( length, 'VER' );

		// .............................................
		// Construction


		// .............................................
		// Configure

		// .............................................
		// Plotting

		// B.flip();
		A.scaleHandles(0);
		B.scaleHandles(0);
		B1.scaleHandles(0);
		A1.scaleHandles(0);


		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		});

		this.pen.setPath( this.path );
		this.pen.add( [ A1, A, B, B1 ] );


		const instructions = {

			level: this.level,
			complete: false,
			gradient: null
		}


		// .............................................
		// Chart

		this.A = A1.clone();
		this.B = B1.clone();

		return [ instructions, this.path ];

	};

}


let instance: HairCapeTail | null = null;

export function drawHairCapeTail( field: any, radius: number ): HairCapeTail {
  
  if (!instance) {

    instance = new HairCapeTail( field, radius );
  }

  return instance;
}