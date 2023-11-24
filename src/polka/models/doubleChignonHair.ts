import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, iron, clap, budge, breakIn, breakOut, mirror } from '../../lib/topo/tools/stitcher';
import { plotAttractorFirstIntersection, plotAttractorLastIntersection } from '../../lib/topo/tools/plotters';

import { traceSegment, markPoint, genRandom, genRandomDec, normalize } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class DoubleChignonHair extends Model {

	
	constructor( field: any, type?: string  ) {

		super( field, type );

		return this;

	}


	public configure() {
		
	};


	public plot( params: any, lvl: number, c: number ) {


		// .............................................
		// Compute parameters

		const area = this.base.PHI.BASE + this.PHI.S;
		const size = this.base.PHI.BASE - this.PHI.M;

		const wRatio = 1//this.SIN54;
		const hRatio = this.SIN54;

		const wfRatio = this.SIN72;
		const hfRatio = 1//this.SIN54;

		const drop = this.base.PHI.BASE * this.SIN18;

		const compression = 0.13;

		// .............................................
		// Key points

		const O = this.base.attractor.locate(0.75).offsetBy( -this.SIN.L, 'RAY' );

		const K = this.base.attractor.locate(0.25).offsetBy( -this.SIN.L, 'RAY' )


		// .............................................
		// Construction

		const field = new OrbitalField( O, [ area * wfRatio, area * hfRatio ] );

		const attL = new Orbital( [ size * wRatio, size * hRatio ] );
		const attR = new Orbital( [ size * wRatio, size * hRatio ] );

		field.addAttractors( [ attR, attL ] );

		// .............................................
		// Configure

		field.compress( 0.50 + compression, 1-compression );
		field.expandBy( -drop, 'RAY' );


		// .............................................
		// Plotting

		const C = plotAttractorLastIntersection( field, 1, 0 );

		mirror(C, 90);

		const C0 = C.clone();
		const L1 = attL.locate(0)

		const K0 = K.clone();

		const R1 = attR.locate(0, true);

		curve( L1, K0, 2/3, 1 );
		curve( K0, R1, 1, 2/3 );

		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( this.path );
		this.pen.add( [ C0, L1, K0, R1 ] );


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


let instance: DoubleChignonHair | null = null;

export function drawDoubleChignonHair( field: any, type?: string  ): DoubleChignonHair {
  
  if (!instance) {

    instance = new DoubleChignonHair( field, type );
  }

  return instance;
}