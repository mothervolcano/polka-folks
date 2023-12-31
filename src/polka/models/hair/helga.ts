import { Path } from 'paper';

import { merge, measure, mid, curve, level, clap, budge, breakIn, breakOut, mirror, ortoAlign } from 'lib/topo/tools/stitcher';
import { plotAttractorFirstIntersection, plotAttractorLastIntersection } from 'lib/topo/tools/plotters';
import { traceSegment, markPoint, genRandom, genRandomDec, normalize } from 'lib/topo/utils/helpers';

import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import Spine from 'polka/attractors/spine';
import OrbitalField from 'polka/attractors/orbitalField';
import SpinalField from 'polka/attractors/spinalField';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Helga extends Model {

	
	constructor( base: any, type?: string  ) {

		super( base, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number, c: number ) {


		// .............................................
		// Compute parameters

		const ponyAngle = genRandomDec(0.10, 0.20);

		const ponySize = this.base.PHI.BASE * this.SIN18;
		const ponyVolume = this.base.PHI.BASE * this.SIN18;
		const ponyLength = this.base.PHI.BASE * 2 + this.PHI.XL;
		const elevation = this.base.PHI.BASE * this.SIN54;

		const elasticSizeRatio = 0.20;
		const hRatio = 1//this.SIN36;
		const wRatio = this.SIN36;

		const volume = this.base.PHI.BASE * this.SIN18;

		// .............................................
		// Key points

		const O = this.base.attractor.locate(ponyAngle).offsetBy( elevation, 'RAY' );
		const K = this.base.attractor.locate(0.25).offsetBy( -elevation, 'RAY' );

		const A = this.base.A;
		const B = this.base.B;

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
		const P = this.base.attractor.locate(0.35).offsetBy( volume, 'RAY' );
		const R1 = B.clone().steer( 15, 180 )

		curve(L1, P, 2/3, 1)
		curve(P,R1,1,2/3)

		// .............................................
		// Construction 2/2

		const field = new SpinalField( [ L1, P ], null, 'DIRECTED' );

		// const att = new Orbital( [0, 0], [ field.length * elasticSizeRatio * wRatio, field.length * elasticSizeRatio * hRatio] );

		const attL = new Spine( field.length * elasticSizeRatio );
		const attR = new Spine( field.length * elasticSizeRatio );
		const att1 = new Spine( field.length * elasticSizeRatio * this.PHILESSER );
		const att2 = new Spine( field.length * elasticSizeRatio * this.PHILESSER );

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
		level(E2, E3)
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


let instance: Helga | null = null;

export function drawHelga( field: any, type?: string  ): Helga {
  
  if (!instance) {

    instance = new Helga( field, type );
  }

  return instance;
}