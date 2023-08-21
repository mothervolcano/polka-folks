import { Path } from 'paper';

import Shape from '../components/shape';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, iron } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Lozenge extends Shape {

	
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

		const P1 = att.locate(0)
		const P2 = att.locate(0.25).offsetBy( h, 'RAY' );
		const P3 = att.locate(0.50)
		const P4 = att.locate(0.75)

		iron( P1, P2 )
		iron( P2, P3 )
		iron( P3, P4 )
		iron( P4, P1 )


		return [ P1, P2, P3, P4 ];

	};
}


let instance: Lozenge | null = null;

export function drawLozenge( radius: number ): Lozenge {
  
  if (!instance) {

    instance = new Lozenge( radius );
  }

  return instance;
}