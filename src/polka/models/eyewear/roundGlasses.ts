import { Path } from 'paper';

import { merge, measure, mid, curve } from 'lib/topo/tools/stitcher';
import { markPoint } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class RoundGlasses extends Model {

	private _glassSize = 0;

	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "round glasses"

		return this;

	};

	configure() {

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

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(attL.getPath(), formaProps)
		this.composer.addPath(attR.getPath(), formaProps)
		this.composer.addPath(this.path, formaProps)

		return this.composer.wrap();

		// .............................................
		// Chart


	}

}


let instance: IModel | null = null;

export function drawRoundGlasses( base: IModel, type?: string ): IModel {
  
  if (!instance) {

    instance = new RoundGlasses( base, type ) as IModel;
  }

  return instance;
}