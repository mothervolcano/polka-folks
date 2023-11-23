import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';
import { IModel } from '../types';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


export class HairPanache extends Model {

	
	constructor( base: IModel,type?: string) {

		super( base, type );

		this.name = "panache";

		return this;

	}


	public configure() {


	}


	public plot( params: any, lvl: number, c: number ) {

		const O = this.base.C.clone();

		const { testCtrl } = params;

		const baseSize = 20;
		const topSize = 40;
		const flatness = 0.75;
		const width = 4/3;

		const attBase = new Orbital( [ baseSize * flatness, baseSize * width ] );
		const attTop = new Orbital( [ topSize * flatness, topSize * width ] );

		const radius = this.base.attractor.length / Math.PI / 2;

		const field = new OrbitalField( O, radius );

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

		const formaProps = {
			level: lvl,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(path, formaProps);


		
		return this.composer.wrap();

	}
}


let instance: IModel | null = null;

export function drawHairPanache( base: IModel, type?: string ): IModel {
  
  if (!instance) {

    instance = new HairPanache( base, type ) as IModel;
  }

  return instance;
}


