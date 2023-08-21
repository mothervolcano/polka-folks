import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';
import SpinalField from '../attractors/spinalField';

import { merge, measure, curve } from '../../lib/topo/tools/stitcher';

import { markPoint, normalize, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class BillyHairFlaps extends BaseModel {

	
	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	}


	public configure() {

		this.level = 2;

	};


	public plot( params: any ) {


		// .............................................
		// Compute parameters

		const d = measure( this.owner.A, this.owner.B );

		const size = d / genRandomDec( this.PHI.M, this.PHI.XS );
		const gap = size * this.PHILESSER;
		const aperture = 0.35;

		// .............................................
		// Key points

		const A = this.owner.A;
		const B = this.owner.B;

		// .............................................
		// Construction 1/2

		const field = new SpinalField( [ A.scaleHandles(0), B.scaleHandles(0) ], null, 1, 1, 'DIRECTED' );

		const attL = new Orbital( [0,0], size );
		const attR = new Orbital( [0,0], size );
		const attC = new Orbital( [0,0], gap );

		field.addAttractors( [ attL, attR ] );

		this.field.addAttractor( attC, 0.25 );

		// .............................................
		// Configure

		field.compress( 0 + aperture, 1 - aperture );
		field.expandBy( size * -1, 'VER' );

		attC.moveBy( gap * this.PHIGREATER, 'VER' );

		// .............................................
		// Construction 2/2

		// const C = field.attractor.locate(0.5).offsetBy( size * 3 * -1, 'VER' );
		const C = attC.locate(0);

		// .............................................
		// Plotting

		const A1 = field.attractor.locate(0).scaleHandles(0);
		const A2 = attL.locate(0).flip();
		const A3 = attL.locate(0.75).flip();

		const B3 = attR.locate(0.25).flip();
		const B2 = attR.locate(0).flip();
		const B1 = field.attractor.locate(1).scaleHandles(0);

		curve( A3, C, 1, 1 );
		curve( C, B3, 1, 1 );
		
		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: false

		});

		this.pen.setPath( this.path );
		this.pen.add( [ A1, A2, A3, C, B3, B2, B1 ] );
		// this.pen.add( [ A1, A2, C, B2, B1 ] );

		this.path.reverse();
		this.path.join( this.pen.trim(this.owner.path) );

		this.path.closed = true;

		const instructions = {

			level: this.level,
			complete: true,
			gradient: null

		}

		// .............................................
		// Chart

		return [ instructions, this.path ];

	};
}


let instance: BillyHairFlaps | null = null;

export function drawBillyHairFlaps( field: any, radius: number ): BillyHairFlaps {
  
  if (!instance) {

    instance = new BillyHairFlaps( field, radius );
  }

  return instance;
}