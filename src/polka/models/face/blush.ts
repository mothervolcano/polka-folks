import { Path } from 'paper';

import { markPoint } from 'lib/topo/utils/helpers';

import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


export class Blush extends Model {

	private _size: number = 0;

	constructor( field: any, type?: string ) {

		super( field, type );

		this.name = "blush";

		return this;

	}


	public configure( sizeBaseValue: number ) {

		this._size = sizeBaseValue;

	};


	public plot( params: any, PIN: string ) {

		const { } = params;

		const size = this._size;

		const att = new Orbital( this.PHI.L, this.base.getPin(PIN) );

		// ............................................................

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true
		});

		this.pen.setPath( path );
		this.pen.add( [ ] );
		// this.pen.mirrorRepeat('HOR');

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(att.getPath(), formaProps);
		
		return this.composer.wrap();

	};
}


let instance: Blush | null = null;

export function drawBlush( field: any, type?: string ): Blush {
  
  if (!instance) {

    instance = new Blush( field, type );
  }

  return instance;
}