import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve } from '../../lib/topo/tools/stitcher';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class BillMonkHair extends Model {

	
	constructor( field: any, radius: number, type?: string ) {

		super( field, radius, type );

		return this;

	}


	public configure() {

		this.level = 2;

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

		// return [ instructions, this.path ];

		this.composer.init();
		this.composer.addPath(this.path, lvl);

		return this.composer.wrap();

	};
}


let instance: BillMonkHair | null = null;

export function drawBillyMonkHair( field: any, radius: number, type?: string ): BillMonkHair {
  
  if (!instance) {

    instance = new BillMonkHair( field, radius, type );
  }

  return instance;
}