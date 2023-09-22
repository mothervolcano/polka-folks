import { ModelConfig } from '../types';

import { Layer, Path } from 'paper';

import Archetype from '../core/archetype';

import { drawIonicHair } from '../models/ionicHair';
import { drawDennisHair } from '../models/dennisHair';
import { drawBillyMonkHair } from '../models/billyMonkHair';
import { drawHairDome } from '../models/hairDome';
import { drawArcWave } from '../models/arcWave';
import { drawHairCurtain } from '../models/hairCurtain';
import { drawBangHairline } from '../models/bangHairline';
import { drawBillyHairFlaps } from '../models/billyHairFlaps';
import { drawHairCurtainHide } from '../models/hairCurtainHide';
import { drawHairCapeTail } from '../models/hairCapeTail';
import { drawHairCap } from '../models/hairCap';
import { drawHairModelTest } from '../models/hairModelTest';

import { drawRoundGlasses } from '../models/roundGlasses';


import * as colors from '../styles/colorSchemes'
import { applyShade } from '../../lib/topo/tools/shaders';
import { renderFace, renderNose, renderEar, renderEye, renderHair, renderFaceFeature } from '../renderers/punk';

import { markPoint, traceSegment, isEven, genRandom, genRandomDec } from '../../lib/topo/utils/helpers'

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Nerd extends Archetype {

	private _colorScheme: any;
	private _hairModelsCatalog: ModelConfig[];
	private _hairlinesCatalog: ModelConfig[];
	private _hairTailsCatalog: ModelConfig[];
	private _earAccessoriesCatalog: ModelConfig[];
	private _neckAccessoriesCatalog: ModelConfig[];
	private _eyeFeaturesCatalog: ModelConfig[];
	private _faceFeaturesCatalog: ModelConfig[];
	private _headFeaturesCatalog: ModelConfig[];

	private l0: any;
	private l1: any;
	private l2: any;
	private l3: any;
	private guides: any;

	constructor( position: any, size: any ) {

		super( position, size );

		// --------------------------------------------
		
		this.l0 = new Layer();
		this.l1 = new Layer();
		this.l2 = new Layer();
		this.l3 = new Layer();

		this.frame.addChildren([ this.l0, this.l1, this.l2, this.l3, this.guides ]);

		// ---------------------------------------------

		this._colorScheme = colors.defaultPolka;

		// ---------------------------------------------


		const hairDome: ModelConfig = {

			create: (f,r) => drawHairDome(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.XL,
			settings: [ ],
			params: [ ],
			compats: []
		};

		const ionicHair: ModelConfig = {

			create: (f,r) => drawIonicHair(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.XL,
			settings: [ ],
			params: [ 0, 0.50 ],
			compats: []
		};

		const dennisHair: ModelConfig = {

			create: (f,r) => drawDennisHair(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.XL,
			settings: [ ],
			params: [ 0.20 ],
			compats: []
		};

		const hairCurtainHide: ModelConfig = {

			create: (f,r) => drawHairCurtainHide(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.L,
			settings: [ ],
			params: [ 'L_EAR_XT', 'R_EAR_XT'],
			compats: []
		}

		const hairCape: ModelConfig = {

			create: (f,r) => drawHairCapeTail(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.XL,
			settings: [ ],
			params: [],
			compats: []
		}

		const hairCap: ModelConfig = {

			create: (f,r) => drawHairCap(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.L,
			settings: [ ],
			params: [],
			compats: []
		}


		const hairCurtain: ModelConfig = {

			create: (f,r) => drawHairCurtain(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.XL,
			settings: [ ],
			params: [ 'L_EAR_XT', 'R_EAR_XT', 0.25 ],
			compats: []
		}

		const bangs: ModelConfig = {

			create: (f,r) => drawBangHairline(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.L,
			settings: [ ],
			params: [ 'L_EAR_XT', 'R_EAR_XT', 0.25 ],
			compats: []
		}

		const billyFlaps: ModelConfig = {

			create: (f,r) => drawBillyHairFlaps(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.L,
			settings: [ ],
			params: [ 0.25 ],
			compats: []
		}

		const arcPattern: ModelConfig = {

			create: (f,r) => drawArcWave(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.XL,
			settings: [ 3 ],
			params: [ ],
			compats: []
		}

		const zigzag: ModelConfig = {

			create: (f,r) => drawArcWave(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.XL,
			settings: [ 10 ],
			params: [ ],
			compats: []
		}

		const roundGlasses: ModelConfig = {

			create: (f,r) => drawRoundGlasses(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.XL,
			settings: [ ],
			params: [ 'EYE_L', 'EYE_R' ],
			compats: []
		}

		const billyMonkHair: ModelConfig = {

			create: (f,r) => drawBillyMonkHair(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.XL,
			settings: [ ],
			params: [ ],
			compats: []
		}

		const hairModelTest: ModelConfig = {

			create: (f,r) => drawHairModelTest(f,r),
			use: null,
			type: '',
			base: null,
			size: this.PHI.L,
			settings: [ ],
			params: [ ],
			compats: []
		}


		// ...................................................

		// hairDome.compats = [ { ...billyFlaps } ];
		hairCape.compats = [ { ...arcPattern }, { ...zigzag } ];
		hairCurtainHide.compats = [ { ...hairCape } ];
		hairCap.compats = [ { ...hairCape }, { ...hairCurtainHide }, { ...arcPattern }, { ...zigzag } ];
		hairDome.compats = [ { ...arcPattern }, { ...zigzag }, { ...billyFlaps } ];

		// ..................................................


		this._hairModelsCatalog = [ hairModelTest ];
		// this._hairModelsCatalog = [ ionicHair, hairDome, hairCap, dennisHair, billyMonkHair ];
		
		this._hairlinesCatalog = [  ];
		// this._hairlinesCatalog = [ hairCurtain, bangs ];

		this._hairTailsCatalog = [  ];
		// this._hairTailsCatalog = [ ];

		this._earAccessoriesCatalog = [ ];

		this._neckAccessoriesCatalog = [ ];
		// this._neckAccessoriesCatalog = [ ];

		// this._eyeFeaturesCatalog = [];
		this._eyeFeaturesCatalog = [ ];

		// this._faceFeaturesCatalog = [ ];
		this._faceFeaturesCatalog = [ roundGlasses ];		

		// this._headFeaturesCatalog = [ ];
		this._headFeaturesCatalog = [ ];


		return this;
	}


	private draw() {


		let plots;
		let sgms;
		let instructions: any;


		// -----------------------------------------------------

		plots = this.plotter.getPlot( 'hair');

		for ( const plot of plots ) {

			instructions = plot?.shift();

			if ( Array.isArray( plot[0] ) ) {

				const nPlot = plot[0];
				instructions = nPlot?.shift();

				nPlot.forEach( (path) => {

					this[`l${instructions.level}` as keyof Nerd].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );

				})

			} else {

				const path = plot[0];

				if ( instructions.complete ) {

					this[`l${instructions.level}` as keyof Nerd].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );

				} else {

					path.fullySelected = true;

				}
			}
		};

		// ............................................................

		plots = this.plotter.getPlot( 'hairline' );

		for ( const plot of plots ) {

			instructions = plot?.shift();

			const path = plot[0];

			if ( instructions.complete ) {
				
				this[`l${instructions.level}` as keyof Nerd].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );

			} else {

				path.fullySelected = true;
			}
		};


		// ............................................................

		plots = this.plotter.getPlot( 'glasses' );

		for ( const plot of plots ) {

			instructions = plot?.shift();

			if ( Array.isArray( plot[0] ) ) {

				const nPlot = plot[0];
				instructions = nPlot?.shift();

				nPlot.forEach( (path) => {

					path.strokeColor = colors.CHART.get(this._colorScheme.skin).contrast.hex;
					path.strokeWidth = instructions.thickness;

					this[`l${instructions.level}` as keyof Nerd].addChild( path );
				})

			} else {

				const path = plot[0];

				if ( instructions.complete ) {

					// this[`l${instructions.level}`].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );

				} else {

					path.fullySelected = true;

				}
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


	// ------------------------------------------------------------------------------------
	// PUBLIC METHODS


	public generate( params: any ) {

		const { baseParams, archetypeParams } = params;
		const { } = archetypeParams;

		console.log(`GENERATING NERD`);

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


	public model( params: any ) {

		const { baseParams, archetypeParams } = params;
		const { splitLat, splitAperture } = archetypeParams;

		console.log(`MODELLING NERD`)

		this.head.plot( baseParams );
		this.face.plot( baseParams );

		// ---------------------------------------------------------------
		// HAIRCUTS

		for ( const modelConfig of this.hairModels ) {

			if ( !modelConfig.use ) { throw new Error(`ERROR @ Nerd: hair model config is missing an instance of the model`) }

			// if ( modelConfig.base ) { modelConfig.use.base = modelConfig.base };

			this.plotter.chart( modelConfig.use.plot( archetypeParams, ...modelConfig.params ), 'wig' );
		}


		// .................................................
		// HAIRLINES

		for ( const modelConfig of this.hairlineModels ) {

			if ( !modelConfig.use ) { throw new Error(`ERROR @ Nerd: hairline model config is missing an instance of the model`) }

			// if ( modelConfig.base ) { modelConfig.use.base = modelConfig.base };

			this.plotter.chart( modelConfig.use.plot( archetypeParams, ...modelConfig.params ), 'hairline' );
		}


		// .................................................
		// FACE FEATURES

		for ( const modelConfig of this._faceFeatureModels ) {

			if ( !modelConfig.use ) { throw new Error(`ERROR @ Nerd: Face Feature model config is missing an instance of the model`) }

			// if ( modelConfig.base ) { modelConfig.use.base = modelConfig.base };

			this.plotter.chart( modelConfig.use.plot( archetypeParams, ...modelConfig.params ), 'facefeature' );
		}


		this.draw();
	};

}

export default Nerd;



