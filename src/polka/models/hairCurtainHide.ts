import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint, genRandomDec } from '../../lib/topo/utils/helpers';
import { IModel } from '../types';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairCurtainHide extends Model {


	
	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "hair curtain";

		return this;

	};


	public configure() {

	};


	public plot( params: any, PIN_A: string, PIN_B: string ) {

		const { } = params;

		// .............................................
		// Compute parameters

		const level = genRandomDec( this.PHI.M, this.PHI.XL );
		const volume = this.PHI.S;

		// .............................................
		// Key points

		// const A = this.owner.getPin(PIN_A);
		// const B = this.owner.getPin(PIN_B);

		const A = this.base.A;
		const B = this.base.B;


		// .............................................
		// Construction


		// .............................................
		// Configure


		// .............................................
		// Plotting


		const AC = this.base.attractor.locate(0.25).offsetBy( level, 'VER' ).scaleHandles(0);
		const A0 = this.base.attractor.locate(0.75).scaleHandles(0);
		const A1 = this.base.attractor.locate(0.75).offsetBy( this.PHI.BASE * -1, 'HOR' ).scaleHandles(0);
		const A2 = this.base.attractor.locate(0);

		const BC = this.base.attractor.locate(0.25).offsetBy( level, 'VER' );
		BC.steer(0, 315).scaleHandles( 0, true, false );

		const _B = B.steer(60, 180).flip();

		// .............................................
		// Chart

		this.A = this.base.A.clone();
		this.B = this.base.B.clone();
		
		// .............................................
		// Drawing

		this.path = new Path({strokeColor: DEBUG_GREEN, strokeWidth: 2, closed: false } );

		this.pen.setPath( this.path );
		this.pen.add( [ AC, A0, A1, A ] );

		const _path = new Path( { closed: false } );

		this.pen.setPath( _path );
		this.pen.add( [ BC, B  ] );

		this.path.join( _path );

		this.pen.trim( this.path );

		this.path.reverse();

		const headWrap = this.base.attractor.extractPath( this.path.firstSegment, this.path.lastSegment );
		headWrap.reverse();
		this.pen.trim( headWrap );
		this.path.join( headWrap );


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

export function drawHairCurtainHide( base: any, type?: string ): IModel {
  
  if (!instance) {

    instance = new HairCurtainHide( base, type ) as IModel;
  }

  return instance;
}