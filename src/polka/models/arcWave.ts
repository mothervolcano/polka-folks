import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import SpinalField from '../attractors/spinalField';

import { merge, measure } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class ArcWave extends Model {
	
		
	private _num: number = 0;
	private _indent: number = 0;


	constructor( position: any, radius: any, type?: string ) {

		super( position, radius, type );

	};


	public configure( numBaseValue: number, indentBaseValue: number = 0 ) {

		this._num = numBaseValue;
		this._indent = indentBaseValue;

	};


	public plot( params: any, numCtrl: number, roundnessCtrl: number, indentCtrl: number ) {

		const { } = params;

		// .............................................
		// Compute parameters

		const distance = measure( this.base.A, this.base.B );

		const num = this._num//genRandom( 2, 10 );
		const roundness = genRandomDec( 0.5, 2 );
		// const indent = distance/(num+4) * genRandomDec( 0.5, 1.5 );
		const indent = 0;

		// .............................................
		// Key points

		const A = this.base.A;
		const B = this.base.B;

		// .............................................
		// Construction


		const field = new SpinalField( [ A.scaleHandles(0), B.scaleHandles(0) ], null, 'DIRECTED' );

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
		const ptsC = field.locate(0.50);

		for ( let i=0; i<ptsC.length; i++ ) {
	
			if ( i === 0 ) { // FIRST POINT
				
				// ptsA[i].offsetBy( indent * -1,'VER').scaleHandles( 1.5 );
				ptsA[i].flip();
				pts.push( ptsA[i] ); 

			}

			// .......................................
			
			ptsC[i].flip();
			ptsC[i].scaleHandles( roundness );
			pts.push(ptsC[i]);

			// ......................................

			if ( i === ptsC.length-1 ) {  // LAST POINT

				// ptsB[i].offsetBy( indent * -1,'VER').scaleHandles( 1.5 );
				ptsB[i].flip();
				pts.push( ptsB[i] ); 

			} else {

				if ( i < ptsC.length-1 ) {

					const pt = merge( ptsB[i].flip(), ptsA[i+1].flip() );

					// pt.offsetBy( indent * -1, 'VER').steer(-90, 0);
					pts.push( pt );

				}
			}
		}

		
		// ...................................................

		// const instructions = {

		// 	level: this.base.level,
		// 	complete: true,
		// 	gradient: false
		// }

		
		this.path = new Path( { strokeColor: DEBUG_GREEN, strokeWidth: 2, closed: true } );

		this.pen.setPath( this.path );
		this.pen.add( [ ...pts ] );

		this.path.reverse();

		this.path.join( this.base.path );
		

		this.composer.init();
		this.composer.addPath(this.path);

		return this.composer.wrap();

		// return [ instructions, this.path ];

	};
};



let instance: ArcWave | null = null;

export function drawArcWave( position: any, radius : any, type?: string ): ArcWave {
  
  if (!instance) {

    instance = new ArcWave( position, radius, type );
  }

  return instance;
}