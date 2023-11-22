import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class HairCurtain extends Model {


	private _splitLat: number = 0;
	private _splitAperture: number = 0;


	constructor( field: any, radius: any, type?: string ) {
		
		super( field, radius, type );

	};


	public configure( splitLatBaseValue: number, splitApertureBaseValue: number ) {

		this.level = 2;

		this._splitLat = splitLatBaseValue;
		this._splitAperture = splitApertureBaseValue;

	};


	public plot( params: any, lvl: number, PIN_A: string, PIN_B: string, c: number ) {

		const { splitLat, splitAperture } = params;

		// ...........................................
		// calculate params

		const splitStart = this.PHI.S;
		const aperture = 290;


		// ...........................................
		// determine keypoints
		
		const A = this.base.A;
		const B = this.base.B;
		const C = this.field.attractor.locate(c);

		C.offsetBy( splitStart, 'VER' ).steer(0, aperture);

		// ...........................................


		const instructions = {

			level: this.level,
			complete: true,
			gradient: false
		}

		this.path = new Path( { strokeColor: DEBUG_GREEN, closed:true } );

		this.pen.setPath( this.path );
		this.pen.add( [ A, C, B ] );

		this.wrap( this.path.firstSegment, this.path.lastSegment );


		// return [ instructions, this.path ];

		this.composer.init();
		this.composer.addPath(this.path, lvl);

		return this.composer.wrap();

	};

}


let instance: HairCurtain | null = null;

export function drawHairCurtain( field: any, radius: any, type?: string ): HairCurtain {
  if (!instance) {
    instance = new HairCurtain( field, radius, type );
  }
  return instance;
}