import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class NewModel extends Model {

	
	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	}


	public configure() {

		this.level = 2;

	};


	public plot( params: any ) {


		// .............................................
		// Compute parameters


		// .............................................
		// Key points


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


		const instructions = {

			level: this.level,
			complete: true,
			gradient: null
		}

		// .............................................
		// Chart

		return [ instructions, this.path ];

	};
}


let instance: NewModel | null = null;

export function drawNewModel( field: any, radius: number ): NewModel {
  
  if (!instance) {

    instance = new NewModel( field, radius );
  }

  return instance;
}