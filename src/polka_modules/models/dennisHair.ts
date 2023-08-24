import { Path, CompoundPath } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, ortoAlign } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandomDec, normalize } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class DennisHair extends Model {

	
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

		const latitude = genRandomDec( 0.35, 0.45 )
		const length = this.PHI.S + this.PHI.L * normalize( latitude, 0.35, 0.50 ) ;
		const advance = this.PHI.L;
		const plateau = this.PHI.S;

		// .............................................
		// Key points

		const A = this.owner.A;
		const C = this.field.attractor.locate( 0.20 );
		const P = this.field.attractor.locate( latitude );

		// .............................................
		// Construction


		// .............................................
		// Configure


		// .............................................
		// Plotting

		C.steer( -80, 180 );

		const A1 = P.clone().offsetBy( -length, 'VER' ).offsetBy( -plateau*this.PHIGREATER, 'HOR' );
		const A2 = P.clone().offsetBy( -length, 'VER' );
		const A3 = P.clone().offsetBy( length, 'HOR' );
		const A4 = P.clone().offsetBy( -plateau, 'HOR' );
		const A5 = P.clone();

		ortoAlign( A1, 'HOR' );
		ortoAlign( A2, 'HOR' );
		ortoAlign( A3, 'VER' ).scaleHandles(0, false, true);
		ortoAlign( A4, 'HOR' ).flip();
		ortoAlign( A5, 'HOR' ).flip();

		curve( C, A1, 2/3, 1 );
		curve( A5, C, 2, 1 );
		curve( A2, A3, 2/3, 2/3 );

		// .....

		const B = A.steer( 90, 180 );
		const B1 = C.clone().steer( -90, 180 );


		// ............................................................

		const _path1 = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true
		});

		this.pen.setPath( _path1 );
		this.pen.add( [ C, A1, A2, A3, A4 ] );
		// this.pen.mirrorRepeat('HOR');


		const _path2 = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: false
		});

		this.pen.setPath( _path2 );
		this.pen.add( [ B, B1 ] );
		// this.pen.mirrorRepeat('HOR');

		const headWrap = this.field.attractor.extractPath( _path2.firstSegment, _path2.lastSegment );
		headWrap.reverse();
		this.pen.trim( headWrap );
		_path2.join(headWrap);



		this.path = new CompoundPath([]);
		this.path.addChildren( [ _path1, _path2 ] );


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


let instance: DennisHair | null = null;

export function drawDennisHair( field: any, radius: number ): DennisHair {
  
  if (!instance) {

    instance = new DennisHair( field, radius );
  }

  return instance;
}