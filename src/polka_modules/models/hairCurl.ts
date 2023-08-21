import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { tie, lock } from '../../lib/topo/tools/stitcher';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairCurl extends BaseModel {

	
	private _curlSize: number;

	constructor( field: any, size: number ) {

		super( field, size );

	}


	public configure( curlSizeBaseValue: number ) {


		this._curlSize = curlSizeBaseValue;

	}


	public plot( c: any, orientation: number = 1, curlSizeValue: number, curlSizeCtrl: number ) {


		const curlSize = curlSizeValue ?  curlSizeValue * curlSizeCtrl : this._curlSize * curlSizeCtrl;

		const rotationAdjustment = 0;

		// const _C = C.clone().offsetBy( -curlSize * 2, 'HOR' ).offsetBy( curlSize, 'RAY' );
		// const att = new Orbital( _C, curlSize, 1 );
		// att.anchorAt( _C );

		const att = new Orbital( [0,0], [ curlSize*4/3, curlSize*4/3 ] );

		this._field.addAttractor( att, c );

		att.moveBy( -curlSize * 2, 'HOR').moveBy( curlSize, 'RAY' );
		att.rotate( rotationAdjustment );

		console.log(`CURL: ${rotationAdjustment}`);

		const O = this._field.getAttractor().locate(c);
		const A = att.locate(0.75);
		const B = att.locate(0)//.offsetBy( curlSize*1/3, 'TAN' );
		const C = att.locate(0.25)//.offsetBy( curlSize*2/3, 'RAY' );
		const D = att.locate(0.50)//.offsetBy( curlSize*2/3, 'RAY' );

		if ( orientation === -1 ) {  O.flip() };

		B.scaleHandles( 12/3, true, false );

		lock( O, B, 4/3 );

		return [ 'L(0)', O, B, C, D ];

	}
}


let instance: HairCurl | null = null;

export function drawHairCurl( field: any, size: any ): HairCurl {
  
  if (!instance) {

    instance = new HairCurl( field, size );
  }

  return instance;
}

