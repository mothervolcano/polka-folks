import { Point, Path } from 'paper';

import Shape from '../components/shape';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, iron } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec, degToRad, radToDeg, normalize } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Cone extends Shape {

	
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

 		const c = att.center.point;
 		const p = att.center.clone().offsetBy( -h, 'VER' ).point;

 		const d = c.getDistance(p);

 		const _a = radToDeg( Math.asin( this.radius / d ) );
 		const a = 180 - 90 - _a;

 		const v = new Point({ angle: a, length: 1 });

 		const t = c.add( v.multiply(this.radius) );

 		console.log(`------> ${ a }`)

 		const Ta = att.locate( normalize( 90-a, 0, 360 ) );
 		const Tb = att.locate( normalize( 90+a, 0, 360 ) );

 		markPoint( Ta );
 		markPoint( Tb );

		// .............................................
		// Configure


		// .............................................
		// Plotting

		const P0 = att.locate(0.75)
		const P1 = att.locate(0)
		const V = att.center.offsetBy( -h, 'VER' );
		const P2 = att.locate(0.50)

		iron(Ta, V)
		iron(V, Tb)

		// curve(P0, Ta, 4/5, 4/5)
		// curve(Tb, P0, 4/5, 4/5)
		curve( P1, Ta )
		curve( Tb, P2 )

		// .............................................
		// Chart

		this.C = V;


		return [ P0, P1, Ta, V, Tb, P2 ];

	};
}


let instance: Cone | null = null;

export function drawCone( radius: number ): Cone {
  
  if (!instance) {

    instance = new Cone( radius );
  }

  return instance;
}