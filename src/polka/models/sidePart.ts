import { Path, CompoundPath } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import Spine from '../attractors/spine';
import OrbitalField from '../attractors/orbitalField';
import SpinalField from '../attractors/spinalField';

import { merge, measure, mid, curve, iron, clap, budge, breakIn, breakOut, mirror, ortoAlign } from '../../lib/topo/tools/stitcher';
import { plotAttractorFirstIntersection, plotAttractorLastIntersection } from '../../lib/topo/tools/plotters';

import { traceSegment, markPoint, genRandom, genRandomDec, normalize } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairModelTest extends Model {

	
	constructor( field: any, type?: string  ) {

		super( field, type );

		return this;

	}


	public configure() {

		this.level = 0;

	};


	public plot( params: any, lvl: number, c: number ) {


		// .............................................
		// Compute parameters

		const spanPos = 0.15;


		// .............................................
		// Key points

		const O = this.base.attractor.locate(spanPos);
		const A = this.base.A;


		// .............................................
		// Construction 1/2



		// .............................................
		// Configure



		// .............................................
		// Plotting 1/3

		const P0 = A.clone().steer(90)
		const P1 = O.clone().steer(90).flip()

		curve( P0, P1 )

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		});

		this.pen.setPath( this.path );
		this.pen.add( [ P0, P1] );

		this.wrap( P0, P1 )


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


let instance: HairModelTest | null = null;

export function drawHairModelTest( field: any, type?: string  ): HairModelTest {
  
  if (!instance) {

    instance = new HairModelTest( field, type );
  }

  return instance;
}