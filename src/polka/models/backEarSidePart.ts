import { Path } from 'paper';

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


class BackEarSidePart extends Model {

	
	constructor( base: any, type?: string  ) {

		super( base, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number, c: number ) {


		// .............................................
		// Compute parameters

		const splitPos = 0.35;

		// .............................................
		// Key points

		const O = this.base.attractor.locate(splitPos);

		const H = this.base.getAtt('EAR_R').center;

		// .............................................
		// Construction 1/2




		// .............................................
		// Configure



		// .............................................
		// Plotting 1/3


		const P0 = O.clone().steer(-45);
		const P1 = H.clone();
		const P2 = H.clone().offsetBy( -this.base.PHI.BASE, 'HOR' );

		curve(P0,P1)
		iron(P2,P0)

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( this.path );
		// this.pen.add( [ L1, P, R1 ] );
		this.pen.add( [ P0, P1, P2 ] );


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


let instance: BackEarSidePart | null = null;

export function drawBackEarSidePart( base: any, type?: string  ): BackEarSidePart {
  
  if (!instance) {

    instance = new BackEarSidePart( base, type );
  }

  return instance;
}