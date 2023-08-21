import { Layer, Path } from 'paper';

import Archetype from '../core/archetype';

import { drawHairSpike } from '../models/hairSpike';
import { drawHairShave } from '../models/hairShave';


import * as colors from '../styles/colorSchemes'
import { applyShade } from '../../lib/topo/tools/shaders';
import { renderFace, renderNose, renderEar, renderEye, renderHair, renderFaceFeature } from '../renderers/punk';

import { markPoint, traceSegment, isEven, genRandom, genRandomDec } from '../../lib/topo/utils/helpers'

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Syd extends Archetype {

	private _colorScheme: any;
	private _hairModelsCatalog: Array<any>;
	private _hairlinesCatalog: Array<any>;
	private _hairTailsCatalog: Array<any>;
	private _earAccessoriesCatalog: Array<any>;
	private _neckAccessoriesCatalog: Array<any>;
	private _eyeFeaturesCatalog: Array<any>;
	private _faceFeaturesCatalog: Array<any>;
	private _headFeaturesCatalog: Array<any>;

	private l0: any;
	private l1: any;
	private l2: any;
	private l3: any;
	private guides: any;

	constructor( position: any, radius: any ) {

		super( position, radius );

		// --------------------------------------------
		
		this.l0 = new Layer();
		this.l1 = new Layer();
		this.l2 = new Layer();
		this.l3 = new Layer();
		this.guides = new Layer();

		this.frame.addChildren([ this.l0, this.l1, this.l2, this.l3, this.guides ]);		

		// ---------------------------------------------
		
		this._colorScheme = null;

		// ---------------------------------------------


		const spike = {

			create: (f,r) => drawHairSpike(f,r),
			use: null,
			type: 'SPIKE',
			owner: null,
			size: this.PHI.XXS,
			settings: [ [ this.PHI.XL ], [ this.PHI.XXS ], [ 0 ] ],
			params: [ 0.25 ],
			compats: []
		}

		const hairShave = {

			create: (f,r) => drawHairShave(f,r),
			use: null,
			type: '',
			owner: null,
			size: this.PHI.XXS,
			settings: [ ],
			params: [ 'L_EAR_XT', 0.25 ],
			compats: []
		}

		// ---------------------------------------------

		spike.compats = [];

		// ---------------------------------------------

		// this._hairModelsCatalog = [  ];
		this._hairModelsCatalog = [ spike ];
		
		// this._hairlinesCatalog = [  ];
		this._hairlinesCatalog = [ ];

		this._hairTailsCatalog = [  ];
		// this._hairTailsCatalog = [ ];

		this._earAccessoriesCatalog = [ ];

		this._neckAccessoriesCatalog = [ ];
		// this._neckAccessoriesCatalog = [ ];

		// this._eyeFeaturesCatalog = [];
		this._eyeFeaturesCatalog = [ ];

		// this._eyeFeaturesCatalog = [ ];
		this._faceFeaturesCatalog = [ ];		

		// this._headFeaturesCatalog = [ ];
		this._headFeaturesCatalog = [ hairShave ];
		

		return this;

	};


	private draw() {
		
		let plots;
		let sgms;
		let instructions;


		// -----------------------------------------------------

		plots = this.plotter.getPlot( 'spike' );

		for ( const plot of plots ) {

			instructions = plot?.shift();

			plot.forEach( (nPlot) => {

				if ( Array.isArray(nPlot) ) {

					const nInstructions = nPlot.shift();

					nPlot.forEach( (path) => {

						this[`l${ nInstructions.level }`].addChild( renderHair( path, this._colorScheme, nInstructions.gradient ) )
						
						// path.fullySelected = true;

					});

				} else {

					const path = nPlot;

					this[`l${instructions.level}`].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );
				}
			});
		};


		// -----------------------------------------------------

		plots = this.plotter.getPlot( 'hair');

		for ( const plot of plots ) {

			instructions = plot?.shift();

			if ( Array.isArray( plot[0] ) ) {

				const nPlot = plot[0];
				instructions = nPlot?.shift();

				nPlot.forEach( (path) => {

					path.strokeColor = DEBUG_GREEN;
					path.strokeWidth = 1;
					// path.fullySelected = true;
				})

			} else {

				const path = plot[0];
				path.fullySelected = true;
				// this[`l${instructions.level}`].addChild( renderFaceFeature( path, this._colorScheme, instructions.gradient ) );
			}
		};


		// -----------------------------------------------------

		plots = this.plotter.getPlot( 'facefeature');

		for ( const plot of plots ) {

			instructions = plot?.shift();

			if ( Array.isArray( plot[0] ) ) {

				const nPlot = plot[0];
				instructions = nPlot?.shift();

				nPlot.forEach( (path) => {

					path.strokeColor = DEBUG_GREEN;
					path.strokeWidth = 1;
					// path.fullySelected = true;
				})

			} else {

				const path = plot[0];
				path.fullySelected = true;
				// this[`l${instructions.level}`].addChild( renderFaceFeature( path, this._colorScheme, instructions.gradient ) );
			}
		};


		// -------------------------------------------------------------
		
		this.l1.addChild( renderFace( this.head.head.getPath(), this._colorScheme ) );
		this.l1.addChild( renderEar( this.head.leftEar.getPath(), this._colorScheme ) );
		this.l1.addChild( renderEar( this.head.rightEar.getPath(), this._colorScheme ) );
		this.l1.addChild( renderEye( this.face.leftEye.getPath(), this._colorScheme, false ) );
		this.l1.addChild( renderEye( this.face.rightEye.getPath(), this._colorScheme, false ) );
		
		this.plotter.clear();
	};


	private plotSpikes( model: any, params: any ) {

		const { spikeNumCtrl, spikeLengthCtrl, spikeSpreadCtrl, shrinkRateCtrl, spikeSharpnessCtrl } = params;

		let spikePlot;

		let thickness = 0.040// * p5
		let indent = 1;

		spikePlot = model.plot(

			0.25,  // C
			0.25 - thickness,  // A
			0.25 + thickness,  // B
			spikeLengthCtrl, 
			spikeSharpnessCtrl,
			indent 
		);

		this.plotter.chart( spikePlot, 'spike' );


		// .....................................................

		const compression = 0.25 * spikeSpreadCtrl;
		// const compression = 0.25 * 0.20;
		const decayRate = shrinkRateCtrl;

		let decay = 0;
		let length;

		const step = ( 0.25 - compression ) / spikeNumCtrl;
		
		for ( let i=1; i<spikeNumCtrl; i++ ) {

			decay += decayRate;
			
			if ( isEven(i) ) {

				indent = Math.min( i * (1/3), 1 );
				indent -= 1/spikeNumCtrl * i;

			} else {

				// decay += decayRate;
				indent = 0;
			}

			length = Math.max( spikeLengthCtrl - decay, 0 );

			thickness -= 1/i * 0.0075

			// LEFT SIDE

			spikePlot = model.plot(

				0.25-step*i,  // C
				0.25-step*i - thickness,  // A
				0.25-step*i + thickness,  // B
				length, 
				spikeSharpnessCtrl,
				indent 
			);
			
			this.plotter.chart( spikePlot, 'spike' );


			// RIGHT SIDE

			spikePlot = model.plot(

				0.25+step*i, // C
				0.25+step*i - thickness, // A
				0.25+step*i + thickness, // B
				length, 
				spikeSharpnessCtrl,
				indent
				);

			this.plotter.chart( spikePlot, 'spike' );
		}
	}

	// ------------------------------------------------------------------------------------
	// PUBLIC METHODS


	public generate( params) {

		const { headParams, eyeParams, noseParams, archetypeParams } = params;
		const { } = archetypeParams;

		console.log(`GENERATING PUNK`);

		// ...............................................................................

		this._colorScheme = { ...colors.punkPolka } ;
		this._colorScheme.skin = this._colorScheme.skin[ genRandom(0, this._colorScheme.skin.length-1) ];
		this._colorScheme.hair = this._colorScheme.hair.filter( (c) => c !== this._colorScheme.skin );
		this._colorScheme.hair = this._colorScheme.hair[ genRandom(0, this._colorScheme.hair.length-1) ];

		
		// ...............................................................................
		// NOTE: head and face need to be plotted at generation time to provide all the models based on them the plots they require

		const eyeMinSize = this.PHI.XS * this.PHILESSER;
		const eyeMaxSize = this.PHI.XS;

		this.head.configure();
		this.face.configure( genRandomDec( eyeMinSize, eyeMaxSize ), genRandomDec(0.070, 0.12), genRandomDec( 0.50, 0.60 ) );

		this.face.plot( eyeParams, noseParams );


		// ...............................................................................

		this.generateHair( this._hairModelsCatalog );
		this.generateHeadFeatures( this._headFeaturesCatalog );
		this.generateHairline( this._hairlinesCatalog );
		this.generateHairTail( this._hairTailsCatalog );
		this.generateEarAccessories( this._earAccessoriesCatalog );
		this.generateNeckAccessories( this._neckAccessoriesCatalog );
		this.generateFaceFeatures( this._faceFeaturesCatalog );
		this.generateEyeFeatures( this._eyeFeaturesCatalog );

		// ...............................................................................

	};


	public model( params ) {

		const { headParams, eyeParams, noseParams, archetypeParams } = params;
		const { spikeNumCtrl, spikeLengthCtrl, spikeSharpnessCtrl, spikeSpreadCtrl, shrinkRateCtrl, shaveDotsDensity } = archetypeParams;

		console.log(`MODELLING PUNK`);

		this.clear();

		this.head.plot( );
		this.face.plot( eyeParams, noseParams );


		// ---------------------------------------------------------------

		for ( const hair of this.hairModels ) {

			if ( hair.owner ) { hair.use.owner = hair.owner };

			if ( hair?.type === 'SPIKE' ) {

				this.plotSpikes( hair.use, archetypeParams );

			} else {

				this.plotter.chart( hair.use.plot( archetypeParams, ...hair.params ), 'hair' );
			}
		};

		// ---------------------------------------------------------------

		for ( const feature of this.headFeatureModels ) {

			if ( feature.owner ) { feature.use.owner = feature.owner };

			this.plotter.chart( feature.use.plot( archetypeParams, ...feature.params ), 'facefeatures' );

		};

		this.draw();
	}
}


export default Syd;

