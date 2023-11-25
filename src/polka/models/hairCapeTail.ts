import { Path } from 'paper';

import { markPoint } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';

import ZigZag from 'polka/lines/zigzag';
import Curtain from 'polka/parts/curtain';


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

		const pts = ZigZag.draw(A1, B1);

		// ............................................................

		const mainPath = new Path({ 
			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		});

		this.pen.setPath( mainPath );
		this.pen.add( [ A1, A, B, B1 ] );

		const closingPath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		})

		this.pen.setPath(closingPath);
		this.pen.add( pts );

		closingPath.reverse();
		const path = mainPath.join(closingPath);


		const curtainPath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		})

		const curtainPlot = Curtain.draw(this.base.attractor, this.base.getPin("L_EAR_XT").position, this.base.getPin("R_EAR_XT").position, 50)

		this.pen.setPath(curtainPath);
		this.pen.add(curtainPlot);


		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		const capitalProps = {
			level: this.level + 2,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(path, formaProps);
		this.composer.addCapital(curtainPath, capitalProps);

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