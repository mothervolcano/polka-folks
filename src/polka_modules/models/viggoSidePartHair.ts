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


class ViggoSidePartHair extends BaseModel {

	
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

		const splitPos = 0.35;
		const cutoffPos = 0.05;

		const height = this.owner.radius * this.SIN18;

		const inWidth = this.owner.radius * this.SIN54;
		const outWidth = this.owner.radius * this.PHILESSER;

		// .............................................
		// Key points

		const O = this.field.attractor.locate(splitPos);

		const H = this.field.attractor.locate(cutoffPos);
		const T = this.field.attractor.locate(0.25).offsetBy(-height, 'VER')


		// .............................................
		// Construction 1/2




		// .............................................
		// Configure


		// .............................................
		// Plotting 1/3

		const A0 = O.clone().steer(90).scaleHandles(0, true, false);

		const A1 = H.clone().offsetBy(inWidth, 'HOR');
		ortoAlign(A1, 'HOR');
		A1.flip();
		const A2 = H.clone().offsetBy(-outWidth, 'HOR');
		const A3 = T.clone().offsetBy(-outWidth, 'TAN');
		const A4 = T.clone();

		curve(A0, A1)
		iron( A1, A2 );


		// .............................................
		// Construction 2/2


		// .............................................
		// Configure 2/2




		// .............................................
		// Plotting 2/3


	

		// .............................................
		// Plotting 3/3





		// .............................................
		// Plotting 3/3



		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( this.path );
		// this.pen.add( [ L1, P, R1 ] );
		this.pen.add( [ A0, A1, A2, A3, A4] );


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


let instance: ViggoSidePartHair | null = null;

export function drawViggoSidePartHair( field: any, radius: number ): ViggoSidePartHair {
  
  if (!instance) {

    instance = new ViggoSidePartHair( field, radius );
  }

  return instance;
}