import { Path } from 'paper';

import { merge, measure, mid, curve } from 'lib/topo/tools/stitcher';
import { markPoint } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Augustine extends Model {

	
	constructor( base: IModel, type?: string ) {

		super( base, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number ) {


		// .............................................
		// Compute parameters


		// .............................................
		// Key points

		const A = this.base.A;
		const B = this.base.B;
		

		// .............................................
		// Construction


		// .............................................
		// Configure




		// .............................................
		// Plotting


		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true
		});

		this.pen.setPath( this.path );
		this.pen.add( [ ] );
		// this.pen.mirrorRepeat('HOR');


		// const instructions = {

		// 	level: this.level,
		// 	complete: true,
		// 	gradient: null
		// }

		// .............................................
		// Chart

		const formaProps = {
			level: lvl,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(this.path, formaProps);

		return this.composer.wrap();

	};
}


let instance: IModel | null = null;

export function drawAugustine( base: IModel, type?: string ): IModel {
  
  if (!instance) {

    instance = new Augustine( base, type ) as IModel;
  }

  return instance;
}