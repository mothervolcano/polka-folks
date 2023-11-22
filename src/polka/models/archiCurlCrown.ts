import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint, genRandomDec } from '../../lib/topo/utils/helpers';
import { mergeAllAttractorIntersections } from '../../lib/topo/tools/plotters';
import { mid, curve } from '../../lib/topo/tools/stitcher';
import { arch } from '../../lib/topo/tools/envelopes';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class ArchiCurlCrown extends Model {

	
	private _waveNum: number = 0;
	private _height: number = 0;
	private _volume: number = 0;
	private _span: number = 0;

	
	constructor( field: any, size: number, type?: string ) {

		super( field, size, type );

		return this;

	}


	public configure(  heightBaseValue: number, volumeBaseValue: number, waveNumBaseValue: number = 3, spanBaseValue: number = 0.10 ) {

		this._waveNum = waveNumBaseValue;
		this._height = heightBaseValue;
		this._volume = volumeBaseValue;
		this._span = spanBaseValue;

	}


	public plot( params: any ) {


		const { curlNumCtrl, heightCtrl, volCtrl } = params;

		// .............................................................
		// Process the parameters

		const num = curlNumCtrl;

		const coreSize = this.SIN.S + this._volume * volCtrl;
		const attSize = this.SIN.XS;
		const curlSize = this.PHI.L / num;

		const coreWidthRatio = 1;
		const coreHeightRatio = 1;

		const height = this._height * heightCtrl;
		const span = genRandomDec( 0.05, 0.15 )//this._span;

		const curlScale = 1;
		const scaleStep = genRandomDec( 0.10, 0.25 );

		// .............................................................
		// Define the key points

		const O = this.field.getAttractor().anchor.clone().offsetBy( height * -1, 'VER' );
		const K = this.field.getAttractor().locate(0.75).offsetBy( this.SIN.XXS * -1, 'VER' ).steer(0, 230);


		// .............................................................
		// base field construction 

		const baseField = new OrbitalField( this.field.attractor.center, this.radius );
		baseField.addAttractor( new Orbital( attSize ) );
		baseField.addAttractor( new Orbital( attSize ) );


		// .............................................................
		// configure the base field

		baseField.compress( 0 + 0.05, 0.50 - 0.05 );
		baseField.expandBy( this.SIN.XS * -1, 'RAY' );



		// .............................................................
		// field construction for curls

		const field = new OrbitalField( O, [ coreSize * coreWidthRatio, coreSize * coreHeightRatio ] );
		const topAtt = new Orbital( curlSize );

		const atts = [ topAtt ];

		for ( let i=0; i<num; i++ ) {

			atts.push( new Orbital( curlSize ));
			atts.unshift( new Orbital( curlSize ));
		}

		field.addAttractors( atts );


		// .............................................................
		// configure the curls field

		field.compress(0 + span, 0.50 - span );
		field.expandBy( height * -1, 'VER' );

		let scaleValue = curlScale;

		arch( field, (att: any) => { att.scale(scaleValue); scaleValue += scaleStep }, () => scaleValue = curlScale )
		

		// .............................................................
		// plot the points for drawing

		const T = topAtt.locate(0);

		const pts = mergeAllAttractorIntersections( field );

		for ( const idx in pts ) {

			const i = parseInt(idx);

			if ( pts[i-1] ) {
				curve( pts[i-1], pts[i], 1, 1 );
			}
		}

		const A = field.firstAttractor.locate(0.95);
		const B = field.lastAttractor.locate(0.95, true);

		const KAKB = baseField.locate(0.80, true);

		const KA = KAKB[0];
		const KB = KAKB[1];

		// curve( KA, A, 2/3, 2/3 );
		// curve( B, KB, 2/3, 2/3 );		
		curve( KA, A, 1, 1 );
		curve( B, KB, 1, 1 );

		// ................

		let curlHollows = field.attractors.map( ( att ) => new Orbital( att.radius*this.PHILESSER, att.center ).getPath() );

		curlHollows = curlHollows.filter( (path, i) => i !== num/2 + 1 );

		curlHollows.map( ( path, i ) => {

			if ( i < curlHollows.length/2 ) {

				path.rotate(-45);

			} else {

				path.rotate(45);
			}

		});

		// ..............................................

		baseField.remove();
		field.remove();
		topAtt.remove();

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( path );
		this.pen.add( [ K, KA, A, ...pts, B, KB ] );

		// path.fullySelected = true;

		// ..............................................

		this.composer.init();
		this.composer.addPath(path);
		return this.composer.wrap();

	}
}


let instance: ArchiCurlCrown | null = null;

export function drawArchiCurlCrown( field: any, size: number, type? : string ): ArchiCurlCrown {
  
  if (!instance) {

    instance = new ArchiCurlCrown( field, size, type );
  }

  return instance;
}