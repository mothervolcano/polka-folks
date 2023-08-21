import { Path } from 'paper';

import Model from '../core/model';

import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class HairCurtainHide extends Model {


	
	constructor( field: any, radius: any ) {

		super( field, radius );

		return this;

	};


	public configure() {

		this.level = 3;
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

		const A = this.owner.A;
		const B = this.owner.B;


		// .............................................
		// Construction


		// .............................................
		// Configure


		// .............................................
		// Plotting


		const AC = this.field.attractor.locate(0.25).offsetBy( level, 'VER' ).scaleHandles(0);
		const A0 = this.field.attractor.locate(0.75).scaleHandles(0);
		const A1 = this.field.attractor.locate(0.75).offsetBy( this.field.attractor.radius * -1, 'HOR' ).scaleHandles(0);
		const A2 = this.field.attractor.locate(0);

		const BC = this.field.attractor.locate(0.25).offsetBy( level, 'VER' );
		BC.steer(0, 315).scaleHandles( 0, true, false );

		const _B = B.steer(60, 180).flip();

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

		const headWrap = this.owner.field.attractor.extractPath( this.path.firstSegment, this.path.lastSegment );
		headWrap.reverse();
		this.pen.trim( headWrap );
		this.path.join( headWrap );


		const instructions = {

			level: this.level,
			complete: false,
			gradient: false
		}

		// .............................................
		// Chart

		this.A = this.owner.A.clone();
		this.B = this.owner.B.clone();

		return [ instructions, this.path ];

	};

}


let instance: HairCurtainHide | null = null;

export function drawHairCurtainHide( field: any, radius: any ): HairCurtainHide {
  
  if (!instance) {

    instance = new HairCurtainHide( field, radius );
  }

  return instance;
}