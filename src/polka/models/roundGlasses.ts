import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, measure, mid, curve } from '../../lib/topo/tools/stitcher';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class RoundGlasses extends Model {

	private _glassSize = 0;

	constructor( field: any, radius: any, type?: string ) {

		super( field, radius, type );

	};

	configure() {

		this.level = 2;

		this._glassSize = this.PHI.M;

	};

	plot( params: any, ATT_L: string, ATT_R: string ) {


		// .............................................
		// Compute parameters

		const size = this.PHI.S;

		// .............................................
		// Key points


		const A = this.base.getAtt( ATT_L ).center;
		const B = this.base.getAtt( ATT_R ).center;

		const d = measure( A, B );

		const attL = new Orbital( d * 2/5, A );
		const attR = new Orbital( d * 2/5, B );


		// .............................................
		// Construction


		// .............................................
		// Configure




		// .............................................
		// Plotting

		const A1 = attL.locate(0.5).flip();
		const A2 = attR.locate(0).flip();

		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 5,
			closed: false
		});

		this.pen.setPath( this.path );
		this.pen.add( [ A1, A2 ] );
		// this.pen.mirrorRepeat('HOR');


		this.composer.init();
		this.composer.addPath(attL.getPath())
		this.composer.addPath(attR.getPath())
		this.composer.addPath(this.path)

		return this.composer.wrap();

		// const instructions = {

		// 	level: this.level,
		// 	complete: false,
		// 	stroke: true,
		// 	thickness: this.PHI.XXS * this.PHILESSER,
		// 	gradient: null
		// }

		// .............................................
		// Chart

		// return [ instructions, [ instructions, attL.getPath(), attR.getPath(), this.path ] ];

	}

}


let instance: RoundGlasses | null = null;

export function drawRoundGlasses( field: any, radius: any, type?: string ): RoundGlasses {
  
  if (!instance) {

    instance = new RoundGlasses( field, radius, type );
  }

  return instance;
}