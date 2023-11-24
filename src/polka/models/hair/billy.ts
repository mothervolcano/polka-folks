import { Path } from 'paper';

import { merge, measure, curve } from 'lib/topo/tools/stitcher';
import { markPoint, normalize, genRandomDec } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';
import SpinalField from 'polka/attractors/spinalField';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Billy extends Model {

	
	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "billy flaps"

		return this;

	}


	public configure() {

	};


	public plot( params: any) {


		// .............................................
		// Compute parameters

		const d = measure( this.base.A, this.base.B );

		const size = d / genRandomDec( this.PHI.M, this.PHI.XS );
		const gap = size * this.PHILESSER;
		const aperture = 0.35;

		// .............................................
		// Key points

		const A = this.base.A;
		const B = this.base.B;

		// .............................................
		// Construction 1/2

		const field = new SpinalField( [ A.scaleHandles(0), B.scaleHandles(0) ], null, 'DIRECTED' );

		const attL = new Orbital( size );
		const attR = new Orbital( size );
		const attC = new Orbital( gap );

		field.addAttractors( [ attL, attR ] );

		// this.base.addAttractor( attC, 0.25 );
		field.addAttractor( attC, 0.25 );

		// .............................................
		// Configure

		field.compress( 0 + aperture, 1 - aperture );
		field.expandBy( size * -1, 'VER' );

		attC.moveBy( gap * this.PHIGREATER * -1, 'VER' );

		// .............................................
		// Construction 2/2

		// const C = field.attractor.locate(0.5).offsetBy( size * 3 * -1, 'VER' );
		const C = attC.locate(0).flip();

		// .............................................
		// Plotting

		const A1 = field.attractor.locate(0).scaleHandles(0);
		const A2 = attL.locate(0.50).flip();
		const A3 = attL.locate(0.25).flip();

		const B3 = attR.locate(0.75).flip();
		const B2 = attR.locate(0.50).flip();
		const B1 = field.attractor.locate(1).scaleHandles(0);

		A1.flip()

		curve( A3, C, 1, 1 );
		curve( C, B3, 1, 1 );
		
		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: false

		});

		this.pen.setPath( this.path );
		this.pen.add( [ A1, A2, A3, C, B3, B2, B1] );

		this.path.reverse();
		this.path.join( this.pen.trim(this.base.path) );

		this.path.closed = true;


		// .............................................
		// Chart

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(this.path, formaProps);

		return this.composer.wrap();

	};
}


let instance: IModel | null = null;

export function drawBilly( base: IModel,  type?: string ): IModel {
  
  if (!instance) {

    instance = new Billy( base, type ) as IModel     ;
  }

  return instance;
}