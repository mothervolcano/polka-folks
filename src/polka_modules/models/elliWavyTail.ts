import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class ElliWavyTail extends BaseModel {

	
	private _height: number;
	private _volume: number;
	private _waveNum: number;
	private _span: number;
	private _length: number;


	constructor( field: any, size: any ) {

		super( field, size );

	}


	public configure( lengthBaseValue: number, volumeBaseValue: number, waveNumBaseValue: number = 3, spanBaseValue: number = 0 ) {

		this._length = lengthBaseValue;
		this._volume = volumeBaseValue;
		this._waveNum = waveNumBaseValue;
		this._span = spanBaseValue;

	}


	public plot( params: any ) {

		// ...................................................

		const { curlNumCtrl, heightCtrl } = params;

		
		// ...................................................
		// calculate the parameters

		const num = curlNumCtrl;
		const coreSize = this.SIN.XL;
		
		const coreWidthRatio = 1;
		const coreHeightRatio = 1;
		
		const length = this._length * heightCtrl;
		

		// ...................................................
		// determine the key points

		const O = this.field.getAttractor().anchor.clone();
		

		// ...................................................
		// build the field
		
		const field = new OrbitalField( O, [ coreSize * coreWidthRatio, coreSize * coreHeightRatio ] );
		field.moveBy( length, 'VER' );

		// field.addAttractors( [ att1_r, att2_r, att3_r, att3_l, att2_l, att1_l ] );

		const tipAtt = new Orbital( [0,0], this.PHI.M / num )

		const atts = [ tipAtt ];

		for ( let i=0; i < num; i++ ) {

			const size = this.PHI.L / ( num );

			atts.push( new Orbital([0,0], size ) );
			atts.unshift( new Orbital([0,0], size ) );

		}

		field.addAttractors( atts );


		// ...................................................
		// transform the attractors

		
		field.compress( 0.50 + this._span, 1 - this._span );

		// let expandAdj = 0;

		// for ( let i=num+1; i<field.getChildren().length; i++ ) {

		// 	expandAdj = -150 * 1/i;
		// 	field.getAttractor(i).moveBy( expandAdj, 'HOR');

		// }


		// ...................................................
		// plot the points for drawing


		const pts = [];

		const pts1 = field.locate( 0.80 );
		const pts2 = field.locate( 0.20 );

		for ( let i=num+1; i<pts1.length; i++ ) {

			// pts.push( pts1[i].offsetBy( ( ( i - pts1.length ) * this.PHI.XS ) * 1, 'HOR').scaleHandles(8/3, false, true ) );
			// pts.push( pts2[i].offsetBy( ( ( i - pts1.length ) * this.PHI.XS ) * 1, 'HOR').scaleHandles(8/3, true, false ) );
			pts.push( pts1[i].scaleHandles(8/3, false, true ) );
			pts.push( pts2[i].scaleHandles(8/3, true, false ) );

		}

		tipAtt.moveBy( this.PHI.S, 'RAY');

		const P = tipAtt.locate(0);

		// ..............................................

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2
		});

		this.pen.setPath( path );
		this.pen.add( [  P, ...pts ] );
		// this.pen.mirrorRepeat('HOR');

		// ..............................................

		return [ 'X(0)', path ];

	}
}


let instance: ElliWavyTail | null = null;

export function drawElliWavyTail( field: any, size: any ): ElliWavyTail {
  
  if (!instance) {

    instance = new ElliWavyTail( field, size );
  }

  return instance;
}


