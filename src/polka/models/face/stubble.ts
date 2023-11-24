import { Path } from 'paper';

import { markPoint } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import Spine from 'polka/attractors/spine';
import OrbitalField from 'polka/attractors/orbitalField';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Stubble extends Model {

	private _att: any;

	private _size: number = 0;

	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "shave";

		return this;

	}


	public configure() {

		this._size = 5;

	}


	public plot( params: any, lvl: number, PIN: string, b: number, direction: number = 0 ) {

		const { shaveDotsDensity } = params;

		// ...................................
		// calculate parameters

		const size = this._size;
		const num = shaveDotsDensity;
		const distance = size*3;
		let compression;


		const A = this.base.getPin(PIN);
		const B = this.base.attractor.locate(b);

		let plots = [];
		let pts;


		// ...................................

		// const field1 = new SpinalField( [ A, B ], null, -1, -1, 'DIRECTED' );
		const field1 = new OrbitalField( this.base.attractor.center, this.PHI.BASE );

		for ( let i=0; i<num; i++ ) {

			field1.addAttractor( new Spine( distance ) );

		}

		field1.compress( 0 + A.position, 0.50 - A.position );

		const instructions1 = {
			level: 2,
			gradient: false
		}

		pts = field1.locate(direction);	
		plots.push( [ instructions1, ...pts.map( (P: any) => new Orbital( size - 1, P ).path ) ] );


		// ...................................

		
		// const field2 = new SpinalField( [ A, B ], null, -1, -1, 'DIRECTED' );
		const field2 = new OrbitalField( this.base.attractor.center, this.PHI.BASE );

		for ( let i=0; i<num-1; i++ ) {

			field2.addAttractor( new Spine( distance + size * 4 + i * 2 ) );

		}

		compression = 1/(num+(num-2));
		field2.compress( 0 + A.position + compression, 0.50 -  A.position - compression );

		const instructions2 = {
			level: 2,
			gradient: false
		}

		pts = field2.locate(direction);	
		plots.push( [ instructions2, ...pts.map( (P: any) => new Orbital( size, P ).path ) ] );


		//...................................

		
		// const field3 = new SpinalField( [ A, B ], null, -1, -1, 'DIRECTED' );
		const field3 = new OrbitalField( this.base.attractor.center, this.PHI.BASE );

		for ( let i=0; i<num-1; i++ ) {

			field3.addAttractor( new Spine( distance-2 ) );

		}

		compression = 1/(num+(num-2));
		field3.compress( 0 + A.position + compression, 0.50 -  A.position - compression );

		const instructions3 = {
			level: 2,
			gradient: false
		}

		pts = field3.locate(direction);	
		plots.push( [ instructions3, ...pts.map( (P: any) => new Orbital( size - 2, P ).path ) ] );


		// ...................................

		
		// const field4 = new SpinalField( [ A, B ], null, -1, -1, 'DIRECTED' );

		// for ( let i=0; i<num-2; i++ ) {

		// 	field4.addAttractor( new Spine( this._position, distance*4 ) );

		// }

		// compression = 1/(num+(num-5.5));
		// field4.compress( 0.075 + compression, 1 - compression );

		// pts = field4.locate(direction);	
		// plots.push( [ 'L(0)', ...pts.map( (P) => new Orbital( P, this._dotSize-2 ).path ) ] );


	}
}


let instance: IModel | null = null;

export function drawStubble( base: IModel, type?: string  ): IModel {
  
  if (!instance) {

    instance = new Stubble( base, type ) as IModel;
  }

  return instance;
}