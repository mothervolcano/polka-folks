import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint, normalize } from '../../lib/topo/utils/helpers';
import { mid, curve } from '../../lib/topo/tools/stitcher';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class AntoinetteWig extends Model {

	
	private _att: any;

	private _height: any;
	private _vol: any;
	private _span: any;


	constructor( field: any, size: number, type?: string ) {

		super( field, size, type );

		this._att = this.field.getAttractor();

		return this;

	}


	public configure( heightBaseValue: number, volumeBaseValue: number, spanBaseValue: number   ) {

		// /* DEBUG */ this.frame = new Layer();

		this._height = heightBaseValue;
		this._vol = volumeBaseValue;
		this._span = spanBaseValue;

	}


	public plot( params: any, c: number ) {

		// /* DEBUG */ this.frame.activate();
		// this.frame.removeChildren();


		const { curlNumCtrl, spanCtrl, heightCtrl, volCtrl } = params;

		// ............................................................................
		

		const baseSize = this.PHI.S + this._vol * volCtrl;
		const topSize = this.PHI.S + ( this._vol * 1/3 ) * volCtrl * -1;

		const height = this._height * heightCtrl * ( 1 + normalize(baseSize, 0, (this.PHI.S + this._vol) ) );
		const expansion = this._vol * volCtrl;
		
		const baseSpan = 0.1 * normalize( baseSize, 0, this._vol );
		const topSpan = 0.15 + 0.075 * normalize( baseSize, 0, (this.PHI.S + this._vol) );

		// ............................................................................
		// Key origin points

		const O = this._att.anchor.clone(); 
		const T = this._att.anchor.clone().offsetBy( height * -1, 'VER');
		const K = this._att.locate(0.75).offsetBy( this.SIN.XS * -1, 'RAY');

		
		// ............................................................................
		// Field construction

		const baseField = new OrbitalField( O, this._att.size );
		const topField = new OrbitalField( T, this._att.size );

		const baseAtt_l = new Orbital( [ baseSize, baseSize ] );
		const baseAtt_r = new Orbital( [ baseSize, baseSize ] );

		const topAtt_l = new Orbital( [ topSize, topSize*1.5 ] );
		const topAtt_r = new Orbital( [ topSize, topSize*1.5 ] );


		baseField.addAttractors( [ baseAtt_l, baseAtt_r ] );
		topField.addAttractors( [ topAtt_l, topAtt_r ] );

		
		// ............................................................................
		// Field manipulation


		baseField.compress( 0+baseSpan, 0.50-baseSpan ).expandBy( expansion, 'RAY');
		topField.compress( 0+topSpan, 0.50-topSpan, false ).expandBy( 50 * heightCtrl * -1, 'VER' ).expandBy( 50, 'RAY' );

		
		// ............................................................................
		// Plotting the points for drawing


		const P1 = baseAtt_l.locate(0.75);
		const P2 = baseAtt_l.locate(0);
		const P3 = baseAtt_l.locate(0.20);

		const P4 = topAtt_l.locate(0.90);
		
		const P5 = topAtt_l.locate(0.25);
		const P6 = topAtt_r.locate(0.25).flip();
		
		const P7 = topAtt_r.locate(0.90).flip();
		
		const P8 = baseAtt_r.locate(0.20).flip();
		const P9 = baseAtt_r.locate(0).flip();
		const P10 = baseAtt_r.locate(0.75).flip();

		
		curve( P4, P5, 1, 1 );
		curve( P6, P7, 1, 1 );

		this.A = P5.clone();
		this.B = P6.clone();
		this.T = mid( P5, P6 );
		this.C = this._att.locate(0.25).offsetBy(25 * heightCtrl * -1, 'VER' );

		// ..............................................

		baseField.remove();
		topField.remove();
		baseAtt_l.remove();
		baseAtt_r.remove();
		topAtt_l.remove();
		topAtt_r.remove();

		const path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( path );
		this.pen.add( [ K, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10 ] );

		// ..............................................

		this.composer.init();
		this.composer.addPath(path);
		return this.composer.wrap();


	}
}


let instance: AntoinetteWig | null = null;

export function drawAntoinetteWig( field: any, size: any, type?: string ): AntoinetteWig {
  
  if (!instance) {

    instance = new AntoinetteWig( field, size, type );
  }

  return instance;
}