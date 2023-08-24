import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import Spine from '../attractors/spine';
import OrbitalField from '../attractors/orbitalField';
import SpinalField from '../attractors/spinalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class HairSpike extends Model {


	private _length: number = 0;
	private _sharpness: number = 0;
	private _indent: number = 0;

	private frame: any;

	
	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	};


	private calculateEdgeAngle( A:any, V:any ) {

		return ( V.tangent.angle - A.normal.angle ) * 1.5;
	};


	public configure( lengthBaseValue: number, sharpnessBaseValue: number, indentBaseValue: number ) {
		
		this._length = lengthBaseValue;
		this._sharpness = sharpnessBaseValue;
		this._indent = indentBaseValue;

	};


	public plot( c: any, a: any, b: any, lengthCtrl: number, sharpnessCtrl: number, identCtrl: number ) {


		// .......................................................
		// calculate the parameters

		const length = this._length * lengthCtrl;
		const sharpness = this._sharpness * sharpnessCtrl;

		const indent = this._indent * identCtrl;

		// .......................................................
		// key points

		const C = this.field.attractor.locate(c);
		const A = this.field.attractor.locate(a);
		const B = this.field.attractor.locate(b);

		C.offsetBy( indent, 'RAY');
		A.offsetBy( indent, C.normal );  
		B.offsetBy( indent, C.normal );


		// .......................................................
		// field construction


		const field = new SpinalField( this.position, length, 1, 1, 'DIRECTED' );
		field.anchorAt( C, 'RAY' );

		field.addAttractor( new Orbital( [ sharpness, sharpness ] ), 1 );

		field.spin(-90);

		// .............................................

		const P1 = field.locate( 0.50, 0 );
		const P2 = field.locate( 0.75, 0 );
		const P3 = field.locate( 0, 0 );

		B.steer( 90 - this.calculateEdgeAngle( A, P1), 180, 0.25 )
		A.steer( -90 + this.calculateEdgeAngle( A, P1), 180, 0.25 )


		// ..............................................

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( path );
		this.pen.add( [ A, P1, P2, P3, B ] );

		// ..............................................

		const instructions = {

			level: 2,
			gradient: null
		}

		return [ instructions, path ];

	}

}


let instance: HairSpike | null = null;


export function drawHairSpike( field: any, radius: number ): HairSpike {
  
  if (!instance) {

    instance = new HairSpike( field, radius );
 
  }

  return instance;

}
