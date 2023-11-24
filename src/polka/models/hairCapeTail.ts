import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';
import { IModel } from '../types';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairCapeTail extends Model {

	private _volume: number = 0;
	private _elevation: number = 0;
	private _length: number = 0;

	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "hair cape";

	};


	public configure( elevationBaseValue: number ) {

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

		const A = this.base.A;
		const B = this.base.B;

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


		// .............................................
		// Chart

		this.A = A1.clone();
		this.B = B1.clone();

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

export function drawHairCapeTail( base: any, type?: string ): IModel {
  
  if (!instance) {

    instance = new HairCapeTail( base, type ) as IModel;
  }

  return instance;
}