import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';
import { IModel } from '../types';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class HairCurtain extends Model {


	private _splitLat: number = 0;
	private _splitAperture: number = 0;


	constructor( base: IModel, type?: string ) {
		
		super( base, type );

		this.name = "hair curtain"

	};


	public configure( splitLatBaseValue: number, splitApertureBaseValue: number ) {

		this._splitLat = splitLatBaseValue;
		this._splitAperture = splitApertureBaseValue;

	};


	public plot( params: any, PIN_A: string, PIN_B: string, c: number ) {

		const { splitLat, splitAperture } = params;

		// ...........................................
		// calculate params

		const splitStart = this.PHI.S;
		const aperture = 290;


		// ...........................................
		// determine keypoints
		
		const A = this.base.A;
		const B = this.base.B;
		const C = this.base.attractor.locate(c);

		C.offsetBy( splitStart, 'VER' ).steer(0, aperture);

		// ...........................................

		this.path = new Path( { strokeColor: DEBUG_GREEN, closed:true } );

		this.pen.setPath( this.path );
		this.pen.add( [ A, C, B ] );

		this.wrap( this.path.firstSegment, this.path.lastSegment );

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(this.path, formaProps);

		return this.composer.wrap();

	};

}


let instance: IModel | null = null;

export function drawHairCurtain( base: IModel, type?: string ): IModel {
  if (!instance) {
    instance = new HairCurtain( base, type ) as IModel;
  }
  return instance;
}