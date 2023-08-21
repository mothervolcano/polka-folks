import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


export class Blush extends BaseModel {

	private _size: number;

	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	}


	public configure( sizeBaseValue: number ) {

		this._size = sizeBaseValue;

	};


	public plot( params: any, PIN: string ) {

		const { } = params;

		const size = this._size;

		const att = new Orbital( this.owner.getPin(PIN), this.PHI.L );

		// ............................................................

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true
		});

		this.pen.setPath( path );
		this.pen.add( [ ] );
		// this.pen.mirrorRepeat('HOR');


		const instructions = {

			level: 2,
			gradient: 'RADIAL'
		}


		return [ instructions, att.getPath() ];

	};
}


let instance: Blush | null = null;

export function drawBlush( field: any, radius: number ): Blush {
  
  if (!instance) {

    instance = new Blush( field, radius );
  }

  return instance;
}