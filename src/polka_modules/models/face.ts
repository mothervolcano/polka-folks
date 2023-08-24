import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';
import Eclipse from '../attractors/eclipse';
import EclipseField from '../attractors/eclipseField';

import { budge } from '../../lib/topo/tools/stitcher';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class Face extends Model {

	private _lEye: any;
	private _rEye: any;
	private _nose: any;

	private _eyeSize: number = 0;
	private _eyeRoundness: number = 0;
	private _eyeDistance: number = 0;
	private _eyeLevel: number = 0;
	private _eyeAngle: number = 0;

	private _noseLength: number = 0;
	private _noseSize: number = 0;
	private _noseWidth: number = 0;

	private ATTS: any;


	constructor( field: any, radius: number, ) {

		super( field, radius );

		this.PINS = {

			L_EYE_C: null,
			R_EYE_C: null,
			CHEEK_L: null,
			CHEEK_R: null

		}

		this.ATTS = {

			EYE_L: null,
			EYE_R: null
		}

		return this;
	}


	get leftEye() {

		return this._lEye;
	}


	get rightEye() {

		return this._rEye;
	}

	get nose() {

		return this._nose;
	}

	public getAtt( ATT: string ) {

		return this.ATTS[ATT];
	}


	public configure( eyeSizeBaseValue: number, eyeDistanceBaseValue: number, eyeLevelBaseValue: number ) {

		this._eyeSize = eyeSizeBaseValue;
		this._eyeDistance = eyeDistanceBaseValue;
		this._eyeLevel = eyeLevelBaseValue;

		this._noseSize = this.PHI.XS;
		this._noseLength = this.SIN.XS;
		this._noseWidth = this.PHI.XS;

		// ------------------------------------------------------------------------



    // const nP = this._field.getAttractor().locate(0.75).offsetBy(40, 'RAY');
    // this._nose = new Eclipse( nP, [ 25, 25 ], 0.30 );

	};


	public plot( eyeParams: any, noseParams: any ) {

		const { eyeScaleCtrl, eyeRoundnessCtrl, eyeDistanceCtrl, pTest, pTest2 } = eyeParams;
		const { noseLengthCtrl, noseScaleCtrl, noseWidthCtrl } = noseParams;

		
		// ------------------------------------------------------------------------
		// Parameter settings

		const eyeSize = this._eyeSize// + this._eyeSize * eyeScaleCtrl;
		const eyeLevel = this._eyeLevel;
		const eyeDistance = this._eyeDistance//+ this._eyeDistance * eyeDistanceCtrl;

		const eyeRoundness = eyeRoundnessCtrl || 1;

		const noseSize = this._noseSize * noseScaleCtrl;
		const noseLength = this._noseLength * noseLengthCtrl;


		// ------------------------------------------------------------------------
		// Apriori Key points



		
		// .........................................................................
		// Eyes Construction

		console.log(`Face.plot: ${ this.field }  /  ${ this.field.attractor.radius }`)

		const eyesField = new EclipseField( this.field.attractor.center, [ this.field.attractor.radius, this.field.attractor.radius ] );

		this._lEye = new Orbital( [ eyeSize, eyeSize * eyeRoundness ] )
		this._rEye = new Orbital( [ eyeSize, eyeSize * eyeRoundness ] )

		eyesField.addAttractor( this._lEye );
    eyesField.addAttractor( this._rEye );


    // .........................................................................
		// Eyes field configuration

		eyesField.envelop( eyeLevel );
	  eyesField.compress( 0.75 + eyeDistance, 0.75 - eyeDistance );
	  // eyesField.scale( this._eyeScale * eyeScaleCtrl, this._eyeScale * eyeScaleCtrl * eyeRoundnessCtrl );
	  eyesField.expandBy( this.PHI.S * pTest2, 'RAY' );
		

    // ------------------------------------------------------------------------
		// Aposteriori Key points

    const N = eyesField.getAttractor().locate(0.75).offsetBy( noseLength, 'RAY' );

		

		// .........................................................................
		// Nose Construction

	  
	  const noseField = new OrbitalField( N, [ noseSize, noseSize ] );
	  noseField.addAttractor( new Orbital( noseSize * this.SIN36 ) );
	  noseField.addAttractor( new Orbital( noseSize * this.SIN36 ) );


    


	  // .........................................................................
		// Nose field configuration

	  noseField.compress( 0 + 0.03, 0.50 - 0.03 );
 		noseField.expandBy( this._noseWidth * noseWidthCtrl, 'RAY' );


	  // .........................................................................
		// Plotting

 		const nA = noseField.locate(0)[0].scaleHandles(3, false, true );
 		const nB = noseField.locate(0)[1].flip().scaleHandles(3, true, false );
 		const nC = noseField.getAttractor().locate(0.75).scaleHandles(2);


 		budge( nA, nB, 120 );

 		this._nose = [ nC, nA, nB ];

 		this.ATTS.EYE_L = this._lEye;
 		this.ATTS.EYE_R = this._rEye;

 		this.PINS.L_EYE_C = this._lEye.center;
 		this.PINS.R_EYE_C = this._rEye.center;
 		this.PINS.CHEEK_L = this._lEye.locate(0).offsetBy( this.PHI.XS, 'RAY');
 		this.PINS.CHEEK_R = this._rEye.locate(0).offsetBy( this.PHI.XS, 'RAY');

	};

}


let instance: Face | null = null;


export function drawFace( field: any, radius: number ): Face {
  
  if (!instance) {

    instance = new Face( field, radius );
 
  }

  return instance;

}


