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


class PuritanCollar extends Model {

	
	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "billy flaps"

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

		Arch.configure({span: 0.10, height: this.SIN.M * p2Ctrl, diff: p3Ctrl})
		// const archPlot = Arch.draw(this.base.attractor, 0.50+span, 1-span);
		const archPlot = Arch.draw(this.base.attractor, 0.50+span, 1-span);

		const A = archPlot[0]
		const B = archPlot[archPlot.length-1]


		const closingPlot = Fold.draw(A, B);


		// .............................................
		// Configure


		// .............................................
		// Plotting

		
		// ............................................................

		const mainPath = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true

		});

		this.pen.setPath( mainPath );
		this.pen.add( archPlot );

		mainPath.fullySelected = true;


		const closingPath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		})

		this.pen.setPath(closingPath);
		this.pen.add( closingPlot );
		

		// TODO: this can be a method of an utility module to close a shape with a Line
		// even before the path is created. The operation can easily be done on the plot.
		// we generate the line's plot with the first and last point in the plot's array
		// then we reverse the order of the line's plot and concatenate the line's plot array
		// with the part's plot array.
		closingPath.reverse();
		const path = mainPath.join(closingPath);


		// .............................................
		// Chart

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(path, formaProps);

		return this.composer.wrap();

	};
}


let instance: IModel | null = null;

export function drawPuritanCollar( base: IModel,  type?: string ): IModel {
  
  if (!instance) {

    instance = new PuritanCollar( base, type ) as IModel     ;
  }

  return instance;
}