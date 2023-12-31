import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint, genRandomDec, genRandom } from '../../lib/topo/utils/helpers';
import { IModel } from '../types';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairDome extends Model {
	

	private _lat: number = 0;
	private _volume: number = 0;
	private _cutoff: number = 0;


	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "dome";

		return this;

	}


	public configure( latBaseValue: number, cutoffBaseValue: number, volumeBaseValue: number ) {

		this._lat = latBaseValue;
		this._cutoff = cutoffBaseValue;
		this._volume = volumeBaseValue;

	}


	public plot( params: any, latCtrl: number = 1, cutoffCtrl: number = 1, volumeCtrl: number = 1 ) {

		const { } = params;

		// .............................................
		// Compute parameters

		const size = genRandomDec( this.PHI.M, this.PHI.L );
		const volume = size * this.PHILESSER;

		const level = genRandomDec( this.SIN.S, this.SIN.XXS );
		const lift = 0.15;

		// .............................................
		// Key points

		const O = this.base.attractor.center;

		// .............................................
		// Construction


		const field = new OrbitalField( O, this.PHI.BASE );
		field.addAttractor( new Orbital( size ) );
		field.addAttractor( new Orbital( size ) );

		
		// .............................................
		// Configure

		field.compress( 0 + lift, 0.50 - lift, false );


		// .............................................
		// Chart

		this.A = field.locate(0)[0].offsetBy( level, 'VER');
		this.B = field.locate(0)[1].offsetBy( level, 'VER');


		// .............................................
		// Plotting


		const P1 = field.locate(0)[0];
		const P2 = field.locate(0.25)[0];
		const P3 = field.locate(0.25)[1].flip();
		const P4 = field.locate(0)[1].flip();


		this.path = new Path( { strokeColor: DEBUG_GREEN, strokeWidth: 2, closed: false } );

		this.pen.setPath( this.path );
		this.pen.add( [ P1, P2, P3, P4 ] )

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}
			
		this.composer.init();
		this.composer.addPath(this.path, formaProps);

		return this.composer.wrap();
		
	}
}


let instance: IModel | null = null;

export function drawHairDome( position: any, type?: string ): IModel {
  
  if (!instance) {

    instance = new HairDome(position, type) as IModel;
  }

  return instance;
}
