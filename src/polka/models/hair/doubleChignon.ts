import { Path } from 'paper';

import { merge, measure, mid, curve, iron, clap, budge, breakIn, breakOut, mirror } from 'lib/topo/tools/stitcher';
import { plotAttractorFirstIntersection, plotAttractorLastIntersection } from 'lib/topo/tools/plotters';
import { traceSegment, markPoint, genRandom, genRandomDec, normalize } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class DoubleChignon extends Model {

	
	constructor( base: IModel, type?: string  ) {

		super( base, type );

		return this;

	}


	public configure() {
		
	};


	public plot( params: any, c: number ) {


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


		// .............................................
		// Chart

	};
}


let instance: IModel | null = null;

export function drawDoubleChignon( base: IModel, type?: string  ): IModel {
  
  if (!instance) {

    instance = new DoubleChignon( base, type ) as IModel;
  }

  return instance;
}