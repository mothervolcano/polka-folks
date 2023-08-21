import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, iron, bounce, budge, breakIn, breakOut } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class SydHair extends Model {

	
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

		const position = genRandomDec( 0.15, 0.45 );
		const span = 0.05;
		const r = this.owner.radius * this.SIN9;
		const volume = this.owner.radius + this.PHI.XS;

		const length = this.owner.radius + genRandomDec( -this.PHI.S, this.PHI.L );

		// .............................................
		// Key points

		const O = this.field.attractor.center.offsetBy( -this.owner.radius * 0.25, 'VER' );


		// .............................................
		// Construction

		const field = new OrbitalField( O, volume );

		const att = new Orbital( r );

		field.addAttractor( att, position );

		// .............................................
		// Configure



		// .............................................
		// Plotting
		
		const C = field.attractor.locate( position );

		const P1 = field.attractor.locate(position - span);
		const P2 = C.clone().offsetBy( length, 'RAY' ).steer(0, 350);
		const P3 = field.attractor.locate(position + span);


		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( this.path );
		this.pen.add( [ P1, P2, P3 ] );

		const _path = field.attractor.getPath();
		_path.divideAt( _path.getNearestLocation( this.owner.rightEar.center.point ) )
		_path.splitAt( _path.getNearestLocation( this.owner.leftEar.center.point ) );
		_path.lastSegment.remove();
		_path.lastSegment.remove();
		
		this.pen.trim( _path );	
		_path.closed = true;

		_path.fullySelected = true;

		this.path = _path.unite( this.path );

		// _path.remove();

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


let instance: SydHair | null = null;

export function drawSydHair( field: any, radius: number ): SydHair {
  
  if (!instance) {

    instance = new SydHair( field, radius );
  }

  return instance;
}