import { Path } from 'paper';

import { merge, measure, mid, curve, level, bounce, budge, breakIn, breakOut } from 'lib/topo/tools/stitcher';
import { markPoint, genRandom, genRandomDec, normalize } from 'lib/topo/utils/helpers';

import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Freckles extends Model {

	
	constructor( field: any, type?: string ) {

		super( field, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number, c: number ) {


		// .............................................
		// Compute parameters

		const num = 3;
		const rMajor = this.PHI.L;
		const rMinor = this.PHI.M;
		const sizeMajor = this.PHI.S;
		const sizeMinor = this.PHI.XS;

		// .............................................
		// Key points

		const O = this.base.attractor.locate(0.35).offsetBy( -this.SIN.L, 'VER' );


		// .............................................
		// Construction

		const innerField = new OrbitalField( O, rMinor );
		const outerField = new OrbitalField( O, rMajor );

		for ( let i=0; i<num; i++ ) {

			const att1 = new Orbital( sizeMajor );
			innerField.addAttractor( att1 );

			const att2 = new Orbital( sizeMinor );
			outerField.addAttractor( att2 );
		}


		// .............................................
		// Configure

		outerField.revolve( normalize(60,0,360) );

		// .............................................
		// Plotting
		


		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( this.path );
		this.pen.add( [] );


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


let instance: Freckles | null = null;

export function drawFreckles( field: any, type?: string  ): Freckles {
  
  if (!instance) {

    instance = new Freckles( field, type );
  }

  return instance;
}