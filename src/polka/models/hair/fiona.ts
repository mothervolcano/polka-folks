import { Path } from 'paper';

import { genRandom, markPoint } from 'lib/topo/utils/helpers';

import { IModel, IPart } from 'polka/types';
import Model from 'polka/core/model';

import ZigZag from 'polka/lines/zigzag';
import Curtain from 'polka/parts/curtain';
import Brim from 'polka/parts/brim';
import Pinch from 'polka/parts/pinch';
import Onda from 'polka/parts/onda';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Fiona extends Model {

	#parts: IPart[] = []

	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "hair cape";

	};


	public configure( elevationBaseValue: number ) {

		this.#parts = [ Curtain, Brim, Pinch, Onda ];
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

		const specs = {
			number: 9,
			height: this.PHI.S
		}

		// .............................................
		// Plotting

		// B.flip();
		A.scaleHandles(0);
		B.scaleHandles(0);
		B1.scaleHandles(0);
		A1.scaleHandles(0);

		const tailPlot = [ A1, A, B, B1 ];
		const patternPlot = ZigZag.draw(A1, B1);

		const hairline = this.#parts[genRandom(0, this.#parts.length-1)]
		hairline.configure(specs);
		// const curtainPlot = Curtain.draw(this.base.attractor, this.base.getPin("L_EAR_XT").position, this.base.getPin("R_EAR_XT").position, 50)
		// const curtainPlot = Brim.draw(this.base.attractor, this.base.getPin("L_EAR_XT").position, this.base.getPin("R_EAR_XT").position, 50)
		// const curtainPlot = Pinch.draw(this.base.attractor, this.base.getPin("L_EAR_XT").position, this.base.getPin("R_EAR_XT").position, 50)
		// const curtainPlot = Onda.draw(this.base.attractor, this.base.getPin("L_EAR_XT").position, this.base.getPin("R_EAR_XT").position, 50)
		// const curtainPlot = Onda.draw(this.base.attractor, 0, 0.25, 50)

		const curtainPlot = hairline.draw(this.base.attractor, this.base.getPin("L_EAR_XT").position, this.base.getPin("R_EAR_XT").position);

		// ............................................................

		const mainPath = new Path({ 
			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		});

		this.pen.setPath( mainPath );
		this.pen.add( tailPlot );

		const closingPath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		})

		this.pen.setPath(closingPath);
		this.pen.add( patternPlot );

		// TODO: this can be a method of an utility module to close a shape with a Line
		// even before the path is created. The operation can easily be done on the plot.
		// we generate the line's plot with the first and last point in the plot's array
		// then we reverse the order of the line's plot and concatenate the line's plot array
		// with the part's plot array.
		closingPath.reverse();
		const path = mainPath.join(closingPath);


		const curtainPath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		})

		this.pen.setPath(curtainPath);
		this.pen.add(curtainPlot);

		curtainPath.fullySelected = true;


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

export function drawFiona( base: any, type?: string ): IModel {
  
  if (!instance) {

    instance = new Fiona( base, type ) as IModel;
  }

  return instance;
}