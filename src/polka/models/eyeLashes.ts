import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


export class EyeLashes extends Model {

	
	constructor( field: any, radius: number ) {

		super( field, radius );

		return this;

	}


	public configure() {


	}


	public plot( params: any, ATT: string ) {
		
		const eyeAtt = this.base.getAtt(ATT);
		const r = eyeAtt.radius * this.SIN36;

		const att = new Orbital( r, eyeAtt.locate(0.25).offsetBy(r, 'RAY') );

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
			gradient: null
		}

		return [ instructions, att.getPath() ];

	}
}


let instance: EyeLashes | null = null;

export function drawEyeLashes( field: any, radius: number ): EyeLashes {
  
  if (!instance) {

    instance = new EyeLashes( field, radius );
  }

  return instance;
}