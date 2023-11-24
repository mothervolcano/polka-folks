import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



export class Earrings extends Model {


	private _beadSize: any;
	private _plumbSize: any;
	private _length: any;


	constructor( field: any, type?: string ) {

		super( field, type );

		this.name = "earrings"

	};


	configure( basePlumbSize: number ) {

		this._plumbSize = basePlumbSize;

	};


	plot( params: any, ATT: string, c: number ) {

		const { volCtrl, heightCtrl } = params;

		// .......................................................
		// set the parameters

		const plumbSize = this.SIN.S * volCtrl;
		const beadSize = plumbSize * this.PHILESSER;


		// ......................................................
		// define the key points

		const O = this.base.getAtt(ATT).locate(c);
		

		const attA1 = new Orbital( plumbSize, O );
		const attA2 = new Orbital( beadSize, attA1.locate(0.75) );
		
		attA1.placeAt( O, attA1.locate(0.25).offsetBy( plumbSize * -1, 'VER' ) );
		attA2.placeAt( attA1.locate(0.75), attA2.locate(0.25) );

		const A0 = attA1.locate(0.75);
		const A1 = attA1.locate(0);
		const A2 = attA1.locate(0.25).offsetBy( plumbSize * -1, 'VER' ).steer(0, 270);
		const A3 = attA1.locate(0.50);

		const A4 = attA2.locate( 0 );
		const A5 = attA2.locate( 0.25 );
		const A6 = attA2.locate( 0.50 );
		const A7 = attA2.locate( 0.75 );


		// ..............................................

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2
		});

		this.pen.setPath( path );
		this.pen.add( [ A0, A1, A2, A3 ] );
		// this.pen.mirrorRepeat('HOR');

		// ................

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(path, formaProps);

		return this.composer.wrap();

		// return [ 'L(0)', [ 'L(0)', path ], [ 'L(0)', A4, A5, A6, A7 ] ];
	}	
}


let instance: Earrings | null = null;

export function drawEarrings( field: any, type?: string ): Earrings {
  
  if (!instance) {

    instance = new Earrings( field, type );
  }

  return instance;
}