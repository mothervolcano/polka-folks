import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { merge, bounce, curve, mid, breakOut, breakIn } from '../../lib/topo/tools/stitcher';
import { plotAllAttractorIntersections, mergeAllAttractorIntersections } from '../../lib/topo/tools/plotters';

import { markPoint, normalize, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class PompadourWig extends Model {

	private _att: any;

	private _height: any;
	private _vol: any;
	private _span: any;
	
	private _angle: any;


	constructor( field: any, radius: number, type?: string ) {

		super( field, radius, type );

		return this;
	};



	configure( heightBaseValue: number, volumeBaseValue: number, spanBaseValue: number ) {

		this._att = this.field.getAttractor();
		
		this._height = heightBaseValue;
		this._vol = volumeBaseValue;
		this._span = 0.15//spanBaseValue;

		this._angle = genRandomDec( -45, 0 );

	};


	plot( params: any, c: number ) {

		
		const { curlNumCtrl, spanCtrl, heightCtrl, volCtrl } = params;
	
		// ................................................
		// set the parameters

		const num = Math.min( curlNumCtrl, 4 );

		const coreWidthRatio = this.SIN54;
		const coreHeightRatio = 1;

		const sideWidthRatio = this.SIN36;
		const sideHeightRatio = this.SIN54;
		
		const coreVolume = this.radius;
		const sideVolume = this.PHI.L + this.PHI.M * normalize( num, 2, 4 )//this._vol;
		const curlVolume = sideVolume//this._vol * this.PHIGREATER * this.PHIGREATER * this.PHIGREATER;

		const height = this._height * heightCtrl * -1;
		const elevationMIN = this.PHI.XXS;
		const elevationMAX = this.PHI.L;
		const elevation = genRandomDec( elevationMIN, elevationMAX );
		const latOffset = normalize( elevation, elevationMIN, elevationMAX*6);
		const inset = 0//this.PHI.S * -1;//this.PHI.XS * volCtrl;

		const spanMIN = [ 0.10, 0.20, 0.25, 0.30 ];
		const span = Math.max( Math.min( this._span * height*0.45 * normalize( num, 0, 1 ), 0.45 ), spanMIN[num-1] );

		const angle = ( -15 * normalize( elevation, elevationMIN, elevationMAX )) - ( 15 * normalize( num, 2, 4 ) )//this._angle;

		let curlSizeVar = 0;

		const curlSizePatterns = [
		                          	[ curlVolume ],
		                          	[ curlVolume, curlVolume*2/5 ],
		                          	[ curlVolume*3/5, curlVolume*4/5, curlVolume*4/5 ],
		                          	[ curlVolume, curlVolume, curlVolume*4/5, curlVolume*3/5 ]

		                          ]

		// ................................................
		// Key points around which everything is anchored

		const C = this._att.anchor.clone().offsetBy( this.SIN.XS * -1, 'VER');
		const Ka = this.field.attractor.locate(1-0.075);
		const Kb = this.field.attractor.locate(0.50+0.075);


		// ................................................
		// Main Field construction

		const field = new OrbitalField( C, [ coreVolume * coreWidthRatio, coreVolume * coreHeightRatio ] );
		const lField = new OrbitalField( null, [ sideVolume * sideWidthRatio, sideVolume ] );
		const rField = new OrbitalField( null, [ sideVolume * sideWidthRatio, sideVolume ] );

		field.addAttractors(  [ lField, rField ] );

		// ................................................
		// Main Field transformation

		field.compress( 0 + latOffset, 0.50 - latOffset );
		field.expandBy( inset, 'HOR' ).expandBy( elevation * -1, 'VER');
		field.spin( angle );


		// ................................................
		// Attractors for the curls


		for ( let i=0; i<num; i++ ) {

			const radius = curlSizePatterns[num-1][i] / (num*0.90);

		 	lField.addAttractor( new Orbital( radius ) );
	
		}

	 lField.compress( 0, span );
	 lField.revolve( 0.90 );


		// ---------------------------------------------------------------------------
		// TODO: orbitals of nested attractor fields are not rotated properly

		for ( let i=0; i<num; i++ ) {

			const radius = curlSizePatterns[num-1][i] / (num*0.90);

			rField.addAttractor( new Orbital( radius ) );
	
		}

		rField.compress( 0, span );
		rField.revolve( 0.90 );

		// rField.spin(180);


		// ---------------------------------------------------------------------------
		// Plotting: determine all the points necessary for drawing

		const pts = mergeAllAttractorIntersections( lField );

		for ( const idx in pts ) {

			const i = parseInt(idx);

			if ( pts[i-1] ) {
				curve( pts[i-1], pts[i], 1, 1 );
			}
		}

		const P1 = lField.getAttractor(0).locate(0.80);
		const A = lField.getAttractor(num-1).locate(0.25);
		// const B = rField.getAttractor(num-1).locate(0.25);

		curve( P1, pts[0], 1, 1 );
		curve( pts[pts.length-1], A, 1, 1 );

		breakIn( P1, 90 );
		curve( Ka, P1, 1, 1 );

		// ..............................................


		const T = mid( rField.attractor.locate(0.25), lField.attractor.locate(0.25) ).offsetBy( height, 'VER').scaleHandles(3);

		breakOut( A, 60 );
		curve( A, T, 1, 1 );

		// TODO: find out what is going on with att.radius 

		const lCurlHollows = lField.attractors.map( (att) => {

			return att.getPath().scale(this.PHILESSER);

			// return new Orbital( att.center, att.radius * this.PHILESSER ).getPath();

		});

		const rCurlHollows = rField.attractors.map( (att) => {

			return att.getPath().scale(this.PHILESSER);
			
			// return new Orbital( att.center, att.radius * this.PHILESSER ).getPath();

		});
		
		// ..............................................

		field.remove();
		lField.remove();
		rField.remove();

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: false
		});

		this.pen.setPath( path );
		this.pen.add( [ Ka, P1, ...pts, bounce(A), T ] );

		this.pen.mirrorRepeat( 'HOR' );

		path.fullySelected = true;

		// ..............................................

		this.composer.init();
		this.composer.addPath(path);
		return this.composer.wrap();

	};

}


let instance: PompadourWig | null = null;

export function drawPompadourWig( field: any, radius: number, type?: string ): PompadourWig {
  
  if (!instance) {

    instance = new PompadourWig( field, radius, type );
  }

  return instance;
}
