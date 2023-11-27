import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, level, bounce, budge, breakIn, breakOut } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairHorn extends Model {

	
	constructor( base: any, type?: string  ) {

		super( base, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number, c: number ) {


		// .............................................
		// Compute parameters

		const position = genRandomDec( 0.15, 0.45 );
		// const span = position < 0.25 ? -0.075 : 0.075;
		const r = this.base.PHI.BASE * this.SIN9;

		const length = this.base.PHI.BASE + genRandomDec( -this.PHI.S, this.PHI.L );

		// .............................................
		// Key points

		// const C = this.field.attractor.locate( position );


		// .............................................
		// Construction

		const att = new Orbital( r );

		//TODO: create field
		// this.base.addAttractor( att, position );

		// .............................................
		// Configure



		// .............................................
		// Plotting

		const P0 = att.locate(0.25).steer(-20, 180);
		const P1 = att.locate(0.50);
		const P2 = att.locate(0.75);
		const P3 = att.locate(0.25).offsetBy( -length, 'TAN' ).flip();

		// bounce( P3 );

		breakIn( P3, 30 * att.orientation );
		breakOut( P3, 200 * att.orientation );

		curve( P2, P3, 1/3, 1 );
		curve( P3, P0, 1/3, 1 );

		// iron(P1,P2);

		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( this.path );
		this.pen.add( [ P0, P1, P2, P3 ] );


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


let instance: HairHorn | null = null;

export function drawHairHorn( field: any, type?: string  ): HairHorn {
  
  if (!instance) {

    instance = new HairHorn( field, type );
  }

  return instance;
}