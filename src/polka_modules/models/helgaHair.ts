import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import Spine from '../attractors/spine';
import OrbitalField from '../attractors/orbitalField';
import SpinalField from '../attractors/spinalField';

import { merge, measure, mid, curve, iron, clap, budge, breakIn, breakOut, mirror, ortoAlign } from '../../lib/topo/tools/stitcher';
import { plotAttractorFirstIntersection, plotAttractorLastIntersection } from '../../lib/topo/tools/plotters';

import { traceSegment, markPoint, genRandom, genRandomDec, normalize } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HelgaHair extends BaseModel {

	
	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	}


	public configure() {

		this.level = 0;

	};


	public plot( params: any, c: number ) {


		// .............................................
		// Compute parameters

		const ponyAngle = genRandomDec(0.10, 0.20);

		const ponySize = this.owner.radius * this.SIN18;
		const ponyVolume = this.owner.radius * this.SIN18;
		const ponyLength = this.owner.radius * 2 + this.PHI.XL;
		const elevation = this.owner.radius * this.SIN54;

		const elasticSizeRatio = 0.20;
		const hRatio = 1//this.SIN36;
		const wRatio = this.SIN36;

		const volume = this.owner.radius * this.SIN18;

		// .............................................
		// Key points

		const O = this.field.attractor.locate(ponyAngle).offsetBy( elevation, 'RAY' );
		const K = this.field.attractor.locate(0.25).offsetBy( -elevation, 'RAY' );

		const A = this.owner.A;
		const B = this.owner.B;

		// .............................................
		// Construction 1/2

		const att = new Orbital( [ponySize* this.SIN54, ponySize ], O );
		att.orientation = -1;
		att.anchorAt( O );


		// .............................................
		// Configure


		// .............................................
		// Plotting 1/3

		const L1 = A.clone()
		const P = this.field.attractor.locate(0.35).offsetBy( volume, 'RAY' );
		const R1 = B.clone().steer( 15, 180 )

		curve(L1, P, 2/3, 1)
		curve(P,R1,1,2/3)

		// .............................................
		// Construction 2/2

		const field = new SpinalField( [ L1, P ], null, 1, 1, 'DIRECTED' );

		// const att = new Orbital( [0, 0], [ field.length * elasticSizeRatio * wRatio, field.length * elasticSizeRatio * hRatio] );

		const attL = new Spine( O, field.length * elasticSizeRatio );
		const attR = new Spine( O, field.length * elasticSizeRatio );
		const att1 = new Spine( O, field.length * elasticSizeRatio * this.PHILESSER );
		const att2 = new Spine( O, field.length * elasticSizeRatio * this.PHILESSER );

		field.addAttractors( [ attL, att1, att2, attR ] );

		// .............................................
		// Configure 2/2

		field.compress( 0.45, 0.75 )


		// .............................................
		// Plotting 2/3

		const E1 = attL.locate(0.50).offsetBy( att1.length * this.SIN18, 'RAY');
		const E2 = att1.locate(1).offsetBy( -att1.length * this.SIN18, 'RAY').steer(90)
		const E3 = att2.locate(1).steer(90)
		const E4 = attR.locate(0.5, true)

	

		// .............................................
		// Plotting 3/3

		const P0 = K.clone().scaleHandles(0)

		const P1 = E3.clone().steer(0); // BUG: I shouldn't need to steer to zero. Investigate.
 		const P2 = att.locate(0);
 		const P3 = att.locate( 0.20 + ponyAngle/2).offsetBy( ponyVolume, 'RAY' );

 		ortoAlign( P3, 'VER')

 		const P4 = P3.clone().offsetBy( ponyLength, 'VER' ).scaleHandles(0);
 		const P5 = P0.clone().offsetBy( ponyLength * this.PHILESSER, 'VER' )

 		curve(P1, P2, 1, 2/3)
 		curve(P2, P3)



		// .............................................
		// Plotting 3/3


		breakIn(E1, -90)
		curve(E1, E2)
		iron(E2, E3)
		curve(E3, E4, 1, 2/3)
		breakOut(E4, -90)


		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		});

		this.pen.setPath( this.path );
		// this.pen.add( [ L1, P, R1 ] );
		this.pen.add( [ P5, P0, P1, P2, P3, P4 ] );


		const instructions = {

			level: this.level,
			complete: false,
			gradient: null
		}

		// .............................................
		// Chart


		return [ instructions, this.path ];

	};
}


let instance: HelgaHair | null = null;

export function drawHelgaHair( field: any, radius: number ): HelgaHair {
  
  if (!instance) {

    instance = new HelgaHair( field, radius );
  }

  return instance;
}