import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


export class HairPanache extends Model {

	
	constructor( field: any, radius: any) {

		super( field, radius );

		return this;

	}


	public configure() {


	}


	public plot( params: any, c: number ) {


		let O;

		if ( this._base ) {

			O = this._base.C.clone();

		} else {

			O = this.field.getAttractor().locate(c);

		}

		const { testCtrl } = params;

		const baseSize = 20;
		const topSize = 40;
		const flatness = 0.75;
		const width = 4/3;

		const attBase = new Orbital( [ baseSize * flatness, baseSize * width ] );
		const attTop = new Orbital( [ topSize * flatness, topSize * width ] );

		const field = new OrbitalField( O, this.radius );

		field.addAttractor( attBase, c );
		field.addAttractor( attTop, c );

		attTop.moveBy( topSize * 2, 'RAY' );

		const A = attBase.locate(0.50);
		const B = attBase.locate(0.70);
		const C = attTop.locate(0.75).offsetBy( topSize*0.15*-1, 'TAN' );
		const D = attTop.locate(0).offsetBy( topSize*0.15*-1, 'RAY');
		const E = attTop.locate(0.25).offsetBy( topSize*0.15, 'TAN' );
		const F = attBase.locate(0.30);

		// ..............................................

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2
		});

		this.pen.setPath( path );
		this.pen.add( [  A, B, C, D, E, F ] );
		// this.pen.mirrorRepeat('HOR');

		// ..............................................

		const instructions = {

			level: 0
		}

		return [ instructions, path ];

	}
}


let instance: HairPanache | null = null;

export function drawHairPanache( field: any, radius: any ): HairPanache {
  
  if (!instance) {

    instance = new HairPanache( field, radius );
  }

  return instance;
}


