import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, level, clap, budge, breakIn, breakOut } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec, normalize } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairDrop extends Model {

	
	constructor( field: any, type?: string ) {

		super( field, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number, c: number ) {


		// .............................................
		// Compute parameters


		const sizeMajor = this.PHI.L;
		const sizeMinor = this.PHI.S;

		const tipLength = this.PHI.L;
		const twist = 5;

		// .............................................
		// Key points

		const O = this.base.attractor.locate(0.35).offsetBy( this.SIN.L, 'RAY' );


		// .............................................
		// Construction

		const field = new OrbitalField( O, sizeMajor );

		const att = new Orbital( sizeMinor );

		field.addAttractor( att );

		field.anchorAt( O, 'TAN' );

		// .............................................
		// Configure


		field.revolve( normalize(150, 0, 360));
		field.expandBy( tipLength, 'RAY' );


		// .............................................
		// Plotting
		
		const P0 = field.attractor.locate(0);
		const P1 = field.attractor.locate(0.25);
		const P2 = att.locate( 0.80 ).scaleHandles( twist, true, false);
		const P3 = field.attractor.locate( 0.75 );

		breakOut( P2, 130 );
		// curve( P1, P2, 1/3, 1 );
		curve( P2, P3, 1, 1 );

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


let instance: HairDrop | null = null;

export function drawHairDrop( field: any, type?: string  ): HairDrop {
  
  if (!instance) {

    instance = new HairDrop( field, type );
  }

  return instance;
}