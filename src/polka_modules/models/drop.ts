import { Path } from 'paper';

import Shape from '../components/shape';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, iron } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Drop extends Shape {

	
	constructor( radius: number ) {

		super( radius );

		return this;

	}


	public plot( attractor: any, height: number = 0 ) {


		// .............................................
		// Compute parameters

		const h = height;

		// .............................................
		// Key points



		// .............................................
		// Construction

 		const att = attractor;

		// .............................................
		// Configure


		// .............................................
		// Plotting

		const P1 = att.locate(0.75)
		const P2 = att.locate(0)
		const P3 = att.locate(0.25).offsetBy( h, 'RAY' ).steer(0, 270 );
		const P4 = att.locate(0.50)

		curve( P2, P3 )
		curve( P3, P4 )

		// .............................................
		// Chart

		this.C = P3;


		return [ P1, P2, P3, P4 ];

	};
}


let instance: Drop | null = null;

export function drawDrop( radius: number ): Drop {
  
  if (!instance) {

    instance = new Drop( radius );
  }

  return instance;
}