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

		const A0 = this.base.attractor.locate(0+spanPos);
		const B0 = this.base.attractor.locate(0.50-spanPos);
		const A = this.base.A;
		const B = this.base.B;


		// .............................................
		// Construction 1/2



		// .............................................
		// Configure



		// .............................................
		// Plotting 1/3

		const L0 = A.clone().steer(90)
		const L1 = A0.clone().steer(90).flip()

		curve( L0, L1 )

		// ....


		const R0 = B.clone().steer(90).flip()
		const R1 = B0.clone().steer(90)

		curve( R1, R0 )


		const _path1 = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( _path1 );
		this.pen.add( [ L0, L1] );

		this.wrap( L0, L1 )


		const _path2 = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});


		this.pen.setPath( _path2 );
		this.pen.add( [ R1, R0] );

		this.wrap( R1, R0 )

		this.path = new CompoundPath([]);
		this.path.addChildren( [ _path1, _path2 ] );

		this.path.fillColor = DEBUG_GREEN


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