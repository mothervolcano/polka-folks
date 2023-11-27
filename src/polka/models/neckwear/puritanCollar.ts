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
import Dimple from 'polka/lines/dimple';
import Cape from 'polka/lines/cape';
import Arch from 'polka/extensions/arch';
import Pinch from 'polka/lines/pinch';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class PuritanCollar extends Model {

	
	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "Puritan Collar"

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

		Arch.configure({span: 0.10, height: this.SIN.M * p2Ctrl, amplitude: p3Ctrl})
		const archPlot = Arch.draw(this.base.attractor, 0.50+span, 1-span);

		const A = archPlot[0]
		const B = archPlot[archPlot.length-1]

		// const closingPlot = Dimple.draw(B, A);
		const closingPlot = Pinch.draw(B, A);

		closingPlot[0].scaleHandles(0, true, false);
		closingPlot[closingPlot.length-1].scaleHandles(0, false, true);

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



		const closingPath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		})

		this.pen.setPath(closingPath);
		this.pen.add( closingPlot );
		
		closingPath.fullySelected = true;

		// TODO: this can be a method of an utility module to close a shape with a Line
		// even before the path is created. The operation can easily be done on the plot.
		// we generate the line's plot with the first and last point in the plot's array
		// then we reverse the order of the line's plot and concatenate the line's plot array
		// with the part's plot array.
		// closingPath.reverse();
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