import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, iron } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class SlantedFringe extends Model {

	
	constructor( field: any, type?: string  ) {

		super( field, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number, ) {


		// .............................................
		// Compute parameters

		const position = genRandomDec( 0.15, 0.22 );
		const angle = genRandomDec( -15, 15 ); // TODO: implement later

		const length = this.base.PHI.BASE * this.PHILESSER;

		// .............................................
		// Key points

		const C = this.base.attractor.locate( position );


		// .............................................
		// Construction


		// .............................................
		// Configure



		// .............................................
		// Plotting

		const P0 = C.clone();
		const P1 = C.clone().offsetBy( -length, 'RAY' );

		iron( P0, P1 );


		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( this.path );
		this.pen.add( [ P0, P1 ] );

		this.wrap( P0, this.base.B );

		this.path.splitAt( this.path.getNearestLocation(this.base.B.point) );
		this.path.lastSegment.remove()


		const instructions = {

			level: this.level,
			complete: false,
			gradient: null
		}

		// .............................................
		// Chart

		this.A = P1;
		this.B = this.base.B;

		return [ instructions, this.path ];

	};
}


let instance: SlantedFringe | null = null;

export function drawSlantedFringe( field: any, type?: string  ): SlantedFringe {
  
  if (!instance) {

    instance = new SlantedFringe( field, type );
  }

  return instance;
}