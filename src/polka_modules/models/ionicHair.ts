import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import DebugDot from '../../lib/topo/utils/debugDot'

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class IonicHair extends BaseModel {


	private _vol: any;
	private _aperture: any;
	private _height: any;

	
	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	};


	public configure( volumeBaseValue, apertureBaseValue, heightBaseValue ) {

		this.level = 2;

		this._vol = volumeBaseValue;
		this._aperture = apertureBaseValue;
		this._height = heightBaseValue;

	};


	public plot( params: any, a: any, b: any, volumeCtrl: number = 0.5, apertureCtrl: number = 1, heightCtrl: number = 0 ) {

		
		const { } = params;

		
		// .......................................
		// Calculate the params

		const lift = 0.15;
		const size = this.PHI.M;
		const volume = size * this.PHILESSER;


		// ........................................
		// Determine key points

		const O = this.field.attractor.center;

		const A = this.field.attractor.locate(a);
		const B = this.field.attractor.locate(b);


		// ........................................
		// Construction

		
		const field = new OrbitalField( O, this.PHI.L );

		field.addAttractor( new Orbital( size ), null );
		field.addAttractor( new Orbital( size ), null );


		// ........................................
		// Configuration


		field.compress( 0 + lift, 0.50 - lift )
		// this._field.spin( 90*volumeCtrl )
		field.expandBy( volume, 'RAY');


		// ........................................
		// Plotting


		const P1 = field.locate(0.90);
		const P2 = field.locate(0.1);
		const P3 = field.locate(0.25);


		const path = new Path( { strokeColor: DEBUG_GREEN, closed: false } );

		this.pen.setPath( path );
		this.pen.add( [ A, P1[0], P2[0], P3[0], P3[1].flip() ] );

		this.pen.mirrorRepeat( 'HOR', false, true );

		const instructions = {

			level: this.level,
			gradient: false
		}

		return [ instructions, path ]; 

	};

}


let instance: IonicHair | null = null;


export function drawIonicHair( field: any, radius: number ): IonicHair {
  
  if (!instance) {

    instance = new IonicHair( field, radius );
 
  }

  return instance;

}

