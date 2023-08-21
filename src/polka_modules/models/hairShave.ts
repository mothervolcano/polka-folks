import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import Spine from '../attractors/spine';
import SpinalField from '../attractors/spinalField';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairShave extends BaseModel {

	private _att: any;

	private _size;

	constructor( field: any, radius: number ) {

		super( field, radius );

	}


	public configure() {

		this._size = 5;

	}


	public plot( params: any, PIN: string, b: number, direction: number = 0 ) {

		const { shaveDotsDensity } = params;

		// ...................................
		// calculate parameters

		const size = this._size;
		const num = shaveDotsDensity;
		const distance = size*3;
		let compression;


		const A = this.owner.getPin(PIN);
		const B = this.field.attractor.locate(b);

		let plots = [];
		let pts;


		// ...................................

		// const field1 = new SpinalField( [ A, B ], null, -1, -1, 'DIRECTED' );
		const field1 = new OrbitalField( this.field.attractor.center, this.field.attractor.radius );

		for ( let i=0; i<num; i++ ) {

			field1.addAttractor( new Spine( this.position, distance ), null );

		}

		field1.compress( 0 + A.position, 0.50 - A.position );

		const instructions1 = {
			level: 2,
			gradient: false
		}

		pts = field1.locate(direction);	
		plots.push( [ instructions1, ...pts.map( (P) => new Orbital( P, size - 1 ).path ) ] );


		// ...................................

		
		// const field2 = new SpinalField( [ A, B ], null, -1, -1, 'DIRECTED' );
		const field2 = new OrbitalField( this.field.attractor.center, this.field.attractor.radius );

		for ( let i=0; i<num-1; i++ ) {

			field2.addAttractor( new Spine( this._position, distance + size * 4 + i * 2 ), null );

		}

		compression = 1/(num+(num-2));
		field2.compress( 0 + A.position + compression, 0.50 -  A.position - compression );

		const instructions2 = {
			level: 2,
			gradient: false
		}

		pts = field2.locate(direction);	
		plots.push( [ instructions2, ...pts.map( (P) => new Orbital( P, size ).path ) ] );


		//...................................

		
		// const field3 = new SpinalField( [ A, B ], null, -1, -1, 'DIRECTED' );
		const field3 = new OrbitalField( this.field.attractor.center, this.field.attractor.radius );

		for ( let i=0; i<num-1; i++ ) {

			field3.addAttractor( new Spine( this._position, distance-2 ), null );

		}

		compression = 1/(num+(num-2));
		field3.compress( 0 + A.position + compression, 0.50 -  A.position - compression );

		const instructions3 = {
			level: 2,
			gradient: false
		}

		pts = field3.locate(direction);	
		plots.push( [ instructions3, ...pts.map( (P) => new Orbital( P, size - 2 ).path ) ] );


		// ...................................

		
		// const field4 = new SpinalField( [ A, B ], null, -1, -1, 'DIRECTED' );

		// for ( let i=0; i<num-2; i++ ) {

		// 	field4.addAttractor( new Spine( this._position, distance*4 ) );

		// }

		// compression = 1/(num+(num-5.5));
		// field4.compress( 0.075 + compression, 1 - compression );

		// pts = field4.locate(direction);	
		// plots.push( [ 'L(0)', ...pts.map( (P) => new Orbital( P, this._dotSize-2 ).path ) ] );


		const instructions = {

			level: 2,
			gradient: false
		}

		return [ instructions, ...plots ];

	}
}


let instance: HairShave | null = null;

export function drawHairShave( field: any, radius: number ): HairShave {
  
  if (!instance) {

    instance = new HairShave( field, radius );
  }

  return instance;
}