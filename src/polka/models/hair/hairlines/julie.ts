import { Path } from 'paper';

import { merge, measure, mid, curve, level, clap, budge, breakIn, breakOut, mirror, ortoAlign } from 'lib/topo/tools/stitcher';
import { plotAttractorFirstIntersection, plotAttractorLastIntersection } from 'lib/topo/tools/plotters';
import { traceSegment, markPoint, genRandom, genRandomDec, normalize } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import Spine from 'polka/attractors/spine';
import OrbitalField from 'polka/attractors/orbitalField';
import SpinalField from 'polka/attractors/spinalField';
import { ImportDeclaration } from 'typescript';



const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Julie extends Model {

	
	constructor( base: IModel, type?: string  ) {

		super( base, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number, c: number ) {


		// .............................................
		// Compute parameters

		const cutPos = 0.35;

		const sizeMajor = this.base.PHI.BASE;
		const sizeMinor = this.base.PHI.BASE * this.PHILESSER;

		const ratioMajor = this.SIN54;
		const ratioMinor = this.SIN54;

		// .............................................
		// Key points

		const O = this.base.attractor.locate(0.25);
		const A = this.base.A;
		const B = this.base.attractor.locate(0.40)

		// .............................................
		// Construction 1/2

		const attMajor = new Orbital( [ sizeMajor, sizeMajor * ratioMajor] );
		const attMinor = new Orbital( [sizeMinor, sizeMinor * ratioMinor ] );

		attMajor.anchorAt( O );
		attMinor.anchorAt( B )

		attMajor.orientation = -1
		attMinor.orientation = -1

		// .............................................
		// Configure

		attMajor.rotate( -30)
		attMinor.rotate( -30 )


		// .............................................
		// Plotting 1/3

		const P0 = A.clone()
		const P1 = attMajor.locate(0.77).scaleHandles(0, true, false)
		const P2 = attMajor.locate(0.95).scaleHandles(0, false, true)
		const P3 = attMinor.locate(0.60).scaleHandles(0, true, false)
		const P4 = attMinor.locate(0)

		curve( P3, P4)


		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		});

		this.pen.setPath( this.path );
		this.pen.add( [ P0, P1, P2, P3, P4 ] );


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


let instance: IModel | null = null;

export function drawJulie( base: IModel, type?: string  ): IModel {
  
  if (!instance) {

    instance = new Julie( base, type ) as IModel;
  }

  return instance;
}