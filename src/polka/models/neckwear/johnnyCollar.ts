import { Path } from 'paper';

import { merge, measure, curve, iron } from 'lib/topo/tools/stitcher';
import { markPoint, normalize, genRandomDec } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';
import SpinalField from 'polka/attractors/spinalField';
import Cap from 'polka/extensions/cap';
import Fold from 'polka/lines/fold';
import Cape from 'polka/lines/cape';
import Arch from 'polka/extensions/arch';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class JohnnyCollar extends Model {

	
	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "Johnny Collar"

		return this;
	}


	public configure() {

	};


	public plot( params: any) {

		const { p1Ctrl, p2Ctrl, p3Ctrl } = params;

		// .............................................
		// Compute parameters

		const span = 0.15 * p1Ctrl

		// .............................................
		// Key points


		// .............................................
		// Construction

		const aperture = 0.015;

		Arch.configure({span: 0.10, height: this.SIN.M * p2Ctrl, amplitude: p3Ctrl})
		const leftPlot = Arch.draw(this.base.attractor, 0.75+aperture, 1-span);
		Arch.configure({span: 0.10, height: this.SIN.M * p2Ctrl, amplitude: p3Ctrl})
		const rightPlot = Arch.draw(this.base.attractor, 0.50+span, 0.75-aperture);

		// leftPlot[0].scaleHandles(0)
		// leftPlot[leftPlot.length-1].scaleHandles(0)

		// rightPlot[0].scaleHandles(0)
		// rightPlot[rightPlot.length-1].scaleHandles(0)

		// iron(leftPlot[leftPlot.length-2], leftPlot[leftPlot.length-1])

		// .............................................
		// Configure


		// .............................................
		// Plotting

		
		// ............................................................

		const leftPath = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true

		});

		this.pen.setPath( leftPath );
		this.pen.add( leftPlot );



		const rightPath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true
		})

		this.pen.setPath(rightPath);
		this.pen.add( rightPlot );
		

		rightPath.fullySelected = true;


		// .............................................
		// Chart

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(leftPath, formaProps);
		this.composer.addPath(rightPath, formaProps);

		return this.composer.wrap();

	};
}


let instance: IModel | null = null;

export function drawJohnnyCollar( base: IModel,  type?: string ): IModel {
  
  if (!instance) {

    instance = new JohnnyCollar( base, type ) as IModel     ;
  }

  return instance;
}