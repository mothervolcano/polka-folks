import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { measure } from '../../lib/topo/tools/stitcher';
import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairCrest extends Model {


	private _crestSize: any;

	
	constructor( field: any, size: number ) {

		super( field, size );

		return this;
	};


	public configure( sizeBaseValue: number ) {

		this._crestSize = sizeBaseValue;

	};


	public plot( params: any, c: number, widthFactor: number ) {


		const { testCtrl } = params;

		const crestSize = 50; // TODO: make the size relative to the base model

		let P;
		let O;
		let A;

		if ( this._base ) {

			P = this._base.T.clone();
			O = this._base.T;
			A = this._base.A.offsetBy(  measure( this._base.A, this._base.T, 1/3 ), 'TAN' ).flip();
			
			P.offsetBy( crestSize*-2, 'VER' );

		} else {

			P = this._field.getAttractor().locate(c);
			O = this._field.getAttractor().locate(c).flip();
			A = this._field.getAttractor().locate(c-widthFactor).flip();

			P.offsetBy( crestSize*2, 'RAY' );
		}


		const field = new OrbitalField( P, [ crestSize, crestSize/1.5 ] );

		const attL = new Orbital( [ crestSize/1.5, crestSize/2]);
		const attR = new Orbital( [ crestSize/1.5, crestSize/2]);

		field.addAttractors( [ attR, attL ] );

		const span = 0.10;

		field.compress( 0.50 + span, 1 - span );
		field.expandBy( crestSize/1.5, 'RAY');
		// field.spin( 45 * testCtrl );

		const B = attL.locate(0.25).scaleHandles(4, true, false);
		const B2 = attL.locate(0.35);
		const C = field.getAttractor().locate(0).scaleHandles(2/3);
		const D = field.getAttractor().locate(0.25);

		O.scaleHandles(0);
		A.scaleHandles(2/3, true, false );
		B.steer(15, 180);
		C.steer(-15, 180);

		// ..............................................

		this.C = P;


		// ..............................................

		const path = new Path({ 

			strokeColor: GUIDES,
			strokeWidth: 4
		});

		this.pen.setPath( path );
		// this.pen.add( [  O, A ] );
		this.pen.add( [  O, A, B, C, D ] );
		this.pen.mirrorRepeat('HOR');

		path.fullySelected = true;

		// ..............................................

		const instructions = {

			level: 0
		}

		return [ instructions, path ];

	}

};


let instance: HairCrest | null = null;

export function drawHairCrest( field: any, size: number ): HairCrest {
  
  if (!instance) {

    instance = new HairCrest( field, size );
  }

  return instance;
}