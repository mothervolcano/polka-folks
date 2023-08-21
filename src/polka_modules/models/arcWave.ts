import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import SpinalField from '../attractors/spinalField';

import { merge, measure } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class ArcWave extends Model {
	
		
	private _num: number;
	private _indent: number;


	constructor( position: any, radius: any ) {

		super( position, radius );

	};


	public configure( numBaseValue: number, indentBaseValue: number = 0 ) {

		this._num = numBaseValue;
		this._indent = indentBaseValue;

	};


	public plot( params: any, numCtrl: number, roundnessCtrl: number, indentCtrl: number ) {

		const { } = params;

		console.log(`@cloudWave ${ this.owner.ID }`)

		// .............................................
		// Compute parameters

		const distance = measure( this.owner.A, this.owner.B );

		const num = this._num//genRandom( 2, 10 );
		const roundness = genRandomDec( 0.5, 2 );
		const indent = distance/(num+4) * genRandomDec( 0.5, 1.5 );

		// .............................................
		// Key points

		const A = this.owner.A;
		const B = this.owner.B;

		// .............................................
		// Construction


		const field = new SpinalField( [ A.scaleHandles(0), B.scaleHandles(0) ], null, -1, 1, 'DIRECTED' );

		const r = field.attractor.length / ( num * 2 );
		const cmpr = 1 / ( num * 2 );

		for ( let i=0; i<num; i++ ) {

			field.addAttractor( new Orbital( r ) );
			
		}


		// .............................................
		// Configure

		field.compress( 0 + cmpr, 1 - cmpr );

		// .............................................
		// Chart


		// .............................................
		// Plotting

		const pts = [];

		const ptsA = field.locate(0.75);
		const ptsB = field.locate(0.25);
		const ptsC = field.locate(0);

		for ( let i=0; i<ptsC.length; i++ ) {
	
			if ( i === 0 ) { // FIRST POINT
				
				// ptsA[i].offsetBy( indent * -1,'VER').scaleHandles( 1.5 );
				pts.push( ptsA[i] ); 

			}

			// .......................................
			
			ptsC[i].scaleHandles( roundness );
			pts.push(ptsC[i]);

			// ......................................

			if ( i === ptsC.length-1 ) {  // LAST POINT

				// ptsB[i].offsetBy( indent * -1,'VER').scaleHandles( 1.5 );
				pts.push( ptsB[i] ); 

			} else {

				if ( i < ptsC.length-1 ) {

					const pt = merge( ptsB[i], ptsA[i+1] );

					pt.offsetBy( indent * -1, 'VER').steer(-90, 0);
					pts.push( pt );

				}
			}
		}

		
		// ...................................................

		const instructions = {

			level: this.owner.level,
			complete: true,
			gradient: false
		}

		
		this.path = new Path( { strokeColor: DEBUG_GREEN, strokeWidth: 2, closed: true } );

		this.pen.setPath( this.path );
		this.pen.add( [ ...pts ] );

		this.path.reverse();

		this.path.join( this.owner.path );

		return [ instructions, this.path ];

	};
};



let instance: ArcWave | null = null;

export function drawArcWave( position: any, radius : any ): ArcWave {
  
  if (!instance) {

    instance = new ArcWave( position, radius );
  }

  return instance;
}