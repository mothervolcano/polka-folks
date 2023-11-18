import { ModelConfig } from '../types';

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


class Punk extends Archetype {

	private _colorScheme: any;

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
		
		this._colorScheme = colors.defaultPolka;

		// ---------------------------------------------


		const spike: ModelConfig = {

			create: (f,r) => drawHairSpike(f,r),
			use: null,
			type: 'SPIKE',
			order: 'first',
			base: null,
			size: this.PHI.XXS,
			settings: [ [ this.PHI.XL ], [ this.PHI.XXS ], [ 0 ] ],
			params: [ 0.25 ],
			compats: []
		}

		const hairShave: ModelConfig = {

			create: (f,r) => drawHairShave(f,r),
			use: null,
			type: '',
			order: 'first',
			base: null,
			size: this.PHI.XXS,
			settings: [ ],
			params: [ 'L_EAR_XT', 0.25 ],
			compats: []
		}

		// ---------------------------------------------

		spike.compats = [];

		// ---------------------------------------------

		

		return this;

	};


	private render() {
		
		let plots;
		let sgms;
		let instructions: any;


		// -----------------------------------------------------

		plots = this.plotter.getPlot( 'spike' );

		for ( const plot of plots ) {

			instructions = plot?.shift();

			plot.forEach( (nPlot: any) => {

				if ( Array.isArray(nPlot) ) {

					const nInstructions = nPlot.shift();

					nPlot.forEach( (path) => {

						this[`l${ nInstructions.level }` as keyof Punk].addChild( renderHair( path, this._colorScheme, nInstructions.gradient ) )
						
						// path.fullySelected = true;

					});

				} else {

					const path = nPlot;

					this[`l${instructions.level}` as keyof Punk].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );
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
		
		this.l1.addChild( renderFace( this.head.getAtt('HEAD').getPath(), this._colorScheme ) );
		this.l1.addChild( renderEar( this.head.getAtt('EAR_L').getPath(), this._colorScheme  ) );
		this.l1.addChild( renderEar( this.head.getAtt('EAR_R').getPath(), this._colorScheme ) );
		this.l1.addChild( renderEye( this.face.getAtt('EYE_L').getPath(), this._colorScheme, false ) );
		this.l1.addChild( renderEye( this.face.getAtt('EYE_R').getPath(), this._colorScheme, false  ) );
		
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


	public generate( params: any ) {

		const { baseParams, archetypeParams } = params;
		const { } = archetypeParams;

		console.log(`GENERATING PUNK`);

		// ...............................................................................

		this._colorScheme = { ...colors.punkPolka } ;
		this._colorScheme.skin = this._colorScheme.skin[ genRandom(0, this._colorScheme.skin.length-1) ];
		this._colorScheme.hair = this._colorScheme.hair.filter( (c: any) => c !== this._colorScheme.skin );
		this._colorScheme.hair = this._colorScheme.hair[ genRandom(0, this._colorScheme.hair.length-1) ];

		
		// ...............................................................................
		// NOTE: head and face need to be plotted at generation time to provide all the models based on them the plots they require

		const eyeMinSize = this.PHI.XS * this.PHILESSER;
		const eyeMaxSize = this.PHI.XS;

		this.head.configure();
		this.face.configure( genRandomDec( eyeMinSize, eyeMaxSize ), genRandomDec(0.070, 0.12), genRandomDec( 0.50, 0.60 ) );

		this.face.plot( baseParams );


		// ...............................................................................

		this.collection = [];

		// ...............................................................................

	};


	public draw( params: any ) {

		const { baseParams, archetypeParams } = params;
		const { spikeNumCtrl, spikeLengthCtrl, spikeSharpnessCtrl, spikeSpreadCtrl, shrinkRateCtrl, shaveDotsDensity } = archetypeParams;

		console.log(`MODELLING PUNK`);

		this.clear();

		this.head.plot( baseParams );
		this.face.plot( baseParams );


		// ---------------------------------------------------------------

		
		for ( const modelConfig of this.collection ) {

			if ( !modelConfig.use ) { throw new Error(`ERROR @ Baroque: model config is missing an instance of the model`) }

			this.plotter.chart( modelConfig.use.plot( archetypeParams, ...modelConfig.params ), modelConfig.type );
		}


		this.render();
	}
}


export default Punk;

