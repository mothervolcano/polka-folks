import { Path, CompoundPath } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve, iron } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairModelTest extends BaseModel {

	
	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	}


	public configure() {

		this.level = 0;

	};


	public plot( params: any ) {


		// .............................................
		// Compute parameters

		const elevation = genRandomDec( 0, this.PHI.S );

		const heightMajor = genRandomDec( this.PHI.XXS, this.PHI.S );
		const heightMinor = 0//this.owner.radius * this.SIN9;
		
		const span = genRandomDec(0.05, 0.15);

		// .............................................
		// Key points

		const C = this.field.attractor.locate( 0.25 );
		const A = this.field.attractor.locate( 0 );
		const B = this.field.attractor.locate( 0.50 );

		// .............................................
		// Construction


		// .............................................
		// Configure




		// .............................................
		// Plotting

		const R0 = C.clone().offsetBy( elevation, 'RAY' ).steer( 0, 100 );
		const R1 = this.field.attractor.locate( 0.25 + span ).offsetBy( heightMajor, 'RAY' ).steer(15, 180);
		// const R2 = this.field.attractor.locate( 0.25 + span + 0.05 ).offsetBy( heightMajor, 'RAY' );
		const R2 = B.clone().offsetBy( heightMinor, 'RAY' ).steer(30, 180);
		const K = this.field.attractor.center;

		curve( R0, R1, 1, 2/3 );
		curve( R1, R2, 1, 1 );

		iron( R2, K );
		iron( K, R0 );


		// ............................................................

		const _path1 = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true
		});

		this.pen.setPath( _path1 );
		this.pen.add( [ R0, R1, R2, K ] );

		const _path2 = _path1.clone();

		_path2.pivot = _path1.firstSegment.point;
		_path2.scale(-1,1);


		this.path = new CompoundPath(null);
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


let instance: HairModelTest | null = null;

export function useHairModelTest( field: any, radius: number ): HairModelTest {
  
  if (!instance) {

    instance = new HairModelTest( field, radius );
  }

  return instance;
}