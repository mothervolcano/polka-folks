import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';
import SpinalField from '../attractors/spinalField';

import { markPoint } from '../../lib/topo/utils/helpers';
import { curve } from '../../lib/topo/tools/stitcher';
import { arch } from '../../lib/topo/tools/envelopes';
import { plotAllAttractorIntersections } from '../../lib/topo/tools/plotters';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class CascadingTail extends BaseModel {

	
	private _curlNum: number;


	constructor( field: any, size: number ) {

		super( field, size );

	};


	public configure( curlNumBaseValue: number = 3 ) {

		this._curlNum = curlNumBaseValue;

	};


	public plot( params: any, B: any, A: any ) {

		const { curlNumCtrl } = params;

		// ....................................................................
		// Calculate the parameters

		const num = curlNumCtrl;

		const attSize = this.SIN.XL / ( num );
		const curlDropLenStep = this.SIN.XL / (num-1);


		// ....................................................................
		// define the key points

		const O = this.field.getAttractor().anchor.clone();

		

		// ....................................................................
		// build the field

		const field = new SpinalField( [ A.flip().steer( -60, -180 ), B.flip().steer( -60, 180) ], null, 1, 1, 'DIRECTED' );
		const centerAtt = new Orbital( [0,0], attSize );

		const atts = [ centerAtt ];

		for ( let i=0; i < num; i++ ) {

			atts.push( new Orbital([0,0], attSize ) );
			atts.unshift( new Orbital([0,0], attSize ) );

		}
		
		field.addAttractors( atts );


		// ....................................................................
		// plot the points for drawing

		const xPts1 = plotAllAttractorIntersections( field, 'NEXT', 'LAST' );
		const xPts2 = plotAllAttractorIntersections( field, 'PREV', 'FIRST' );

		// get the positions so the points can be re-plotted after the attractors are moved
		const pos1 = xPts1.map( (pt) => pt.position );
		const pos2 = xPts2.map( (pt) => pt.position );

		let dropLen = 0;

		arch( field, ( att, i ) => {  

			dropLen += curlDropLenStep;
			att.moveBy( dropLen, 'VER' );

		}, () => dropLen = 0 );


		// ..........................................
		// Pattern: straight / curve / ... 

		const pts = [];

		pos2.unshift( null ); // add a padding so the arrays indexes are aligned

		for ( let i=0; i<field.getChildren().length; i++ ) {

			if ( pos2[i] ) {

				const pt = field.getAttractor( i ).locate( pos2[i] );
				pt.flip().scaleHandles(0, true, true );

				pts.push( pt );
			}

			if ( pos1[i] ) {

				const pt =  field.getAttractor( i ).locate( pos1[i] );
				pt.flip().scaleHandles(0, true, true );

				// Smooth curve

				if ( pts[i-1] ) {

					curve( pts[ pts.length-1 ], pt, 2/3, 2/3 );

				}

				pts.push( pt );

			}

		}


		// field.expandBy( this.PHI.XL, 'VER' );

		// field.addAttractor( centerAtt );

		// ..............................................

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2
		});

		this.pen.setPath( path );
		this.pen.add( [  ...pts ] );
		// this.pen.mirrorRepeat('HOR');

		// ..............................................

		return [ 'X(0)', path ];

	};

}


let instance: CascadingTail | null = null;

export function drawCascadingTail( field: any, size: number ): CascadingTail {
  
  if (!instance) {

    instance = new CascadingTail( field, size );
  }

  return instance;
}

