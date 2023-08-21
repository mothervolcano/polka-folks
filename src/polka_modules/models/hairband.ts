import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Hairband extends Model {

	private _att: any;

	private _width: number;

	
	constructor( field: any, size: any ) {

		super( field, size );

	};


	public configure() {

		this._att = this.field.getAttractor();

		this._width = this.PHI.S;

	};


	public plot( a: any, b: any, c: any ) {

		const A = this._att.locate(a);
		const B = this._att.locate(b);
		const C = this._att.locate(c);

		const _A = A.clone().steer(-18, 180);
		const _B = B.clone().steer(18, 180);
		const _C = C.clone().offsetBy( this._width * -1, 'VER').scaleHandles(5/6);

		markPoint( A );
		markPoint( B );

		return [ 'L(0)', [ 'L(0)', A, C.scaleHandles(2/3), B ], [ 'L(0)', _A, _C, _B ] ];

	};

}


let instance: Hairband | null = null;

export function drawHairband( field: any, size: any ): Hairband {
  
  if (!instance) {

    instance = new Hairband( field, size );
  }

  return instance;
}