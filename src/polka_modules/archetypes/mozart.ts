import { Layer, Path } from 'paper';

import Archetype from '../core/archetype';

import { drawPompadourWig } from '../models/pompadourWig';
import { drawAntoinetteWig } from '../models/antoinetteWig';
import { drawHairCurl } from '../models/hairCurl';
import { drawHairline } from '../models/hairline';
import { drawMozartHairline } from '../models/mozartHairline';
import { drawBangHairline } from '../models/bangHairline';
import { HairPanache, drawHairPanache } from '../models/hairPanache';
import { drawHairCrest } from '../models/hairCrest';
import { drawElliWavyTail } from '../models/elliWavyTail';
import { drawArchiCurlCrown } from '../models/archiCurlCrown';
import { drawCascadingTail } from '../models/cascadingTail';
import { Earrings, drawEarrings } from '../models/earrings';
import { drawNecklace } from '../models/necklace';
import { drawJabot } from '../models/jabot';

import { EyeLashes, drawEyeLashes } from '../models/eyeLashes';
import { Blush, drawBlush } from '../models/blush';

import { drawEarModelTest } from '../models/earModelTest';


import * as colors from '../styles/colorSchemes'
import { applyShade } from '../../lib/topo/tools/shaders';
import { renderFace, renderNose, renderEar, renderEye, renderHair, renderFaceFeature } from '../renderers/baroque';

import { traceSegment, isEven, genRandom, genRandomDec } from '../../lib/topo/utils/helpers'

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class Mozart extends Archetype {

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


	constructor( position: any, radius: number ) {

		super( position, radius );

		// ---------------------------------------
		
		this.l0 = new Layer();
		this.l1 = new Layer();
		this.l2 = new Layer();
		this.l3 = new Layer();
		this.guides = new Layer();

		this.frame.addChildren([ this.l0, this.l1, this.l2, this.l3, this.guides ]);
		
		// ---------------------------------------

		this._colorScheme = colors.defaultPolka;

		
		// ---------------------------------------


		interface ModelConfig {

			create: (field:any, radius: number) => void; //TODO finish: f can be an AttractorField or AttractorObject
			use: Function | null; //TODO the type is a model
			owner: any;
			size: number;
			settings: any[];
			params: any[];
			compats: any[];
		}


		const antoinette: ModelConfig = {

			create: (f,r) => drawAntoinetteWig(f,r),
			use: null,
			owner: null,
			size: this.PHI.XL,
			settings: [ [ this.PHI.L, this.PHI.XL ], [ this.SIN.L, this.SIN.S ], [ 0.20 ] ],
			params: [ 0.25 ],
			compats: []
		}

		const pompadour: ModelConfig = {

			create: (f,r) => drawPompadourWig(f,r),
			use: null,
			owner: null,
			size: this.SIN.XL,
			settings: [ [ this.PHI.L, this.PHI.XL ], [ this.SIN.L, this.SIN.S ], [ 0.20 ] ],
			params: [ 0.25 ],
			compats: []
		}

		const curlDome: ModelConfig = {

			create: (f,r) => drawArchiCurlCrown(f,r),
			use: null,
			owner: null,
			size: this.PHI.XL,
			settings: [ [ this.PHI.M ], [this.PHI.L], [3], [0.10] ],
			params: [ 0.25 ],
			compats: []
		}

		const crest: ModelConfig = {

			create: (f,r) => drawHairCrest(f,r),
			use: null,
			owner: null,
			size: this.PHI.L,
			settings: [],
			params: [ 0.25, 0.10 ],
			compats: []
		}

		const panache: ModelConfig = {

			create: (f,r) => new HairPanache(f,r),
			use: null,
			owner: null,
			size: this.PHI.M,
			settings: [],
			params: [ 0.25 ],
			compats: []
		}

		const hairline: ModelConfig = {

			create: (f,r) => drawHairline(f,r),
			use: null,
			owner: null,
			size: this.PHI.M,
			settings: [],
			params: [ 'L_EAR_XT', 'R_EAR_XT', 0.25  ],
			compats: []
		}

		const bangLine: ModelConfig = {

			create: (f,r) => drawBangHairline(f,r),
			use: null,
			owner: null,
			size: this.PHI.M,
			settings: [],
			params: [ 'L_EAR_XT', 'R_EAR_XT', 0.25 ],
			compats: []
		}

		const mozartLine: ModelConfig = {

			create: (f,r) => drawMozartHairline(f,r),
			use: null,
			owner: null,
			size: this.PHI.M,
			settings: [],
			params: [ 'L_EAR_XT', 'R_EAR_XT', 0.25 ],
			compats: []
		}

		const cascadeTail: ModelConfig = {

			create: (f,r) => drawCascadingTail(f,r),
			use: null,
			owner: null,
			size: this.PHI.L,
			settings: [],
			params: [ 0.25 ],
			compats: []
		}

		const wavyTail: ModelConfig = {

			create: (f,r) => drawElliWavyTail(f,r),
			use: null,
			owner: null,
			size: this.SIN.XL,
			settings: [ [ this.PHI.XL ], [ this.SIN.L ] ],
			params: [ 0.25 ],
			compats: []
		};

		const earringLeft: ModelConfig = {

			create: (f,r) => drawEarrings(f,r),
			use: null,
			owner: null,
			size: this.SIN.XS,
			settings: [ ],
			params: [ 'EAR_L', 0.75 ],
			compats: []
		};

		const earringRight: ModelConfig = {

			create: (f,r) => drawEarrings(f,r),
			use: null,
			owner: null,
			size: this.SIN.XS,
			settings: [ ],
			params: [ 'EAR_R', 0.75 ],
			compats: []
		};

		const lashesLeft: ModelConfig = {

			create: (f,r) => drawEyeLashes(f,r),
			use: null,
			owner: null,
			size: this.SIN.XS,
			settings: [ ],
			params: [ 'EYE_L', 0.75 ],
			compats: []

		}

		const lashesRight: ModelConfig = {

			create: (f,r) => drawEyeLashes(f,r),
			use: null,
			owner: null,
			size: this.SIN.XS,
			settings: [ ],
			params: [ 'EYE_R', 0.75 ],
			compats: []

		}

		const blushLeft: ModelConfig = {

			create: (f,r) => drawBlush(f,r),
			use: null,
			owner: null,
			size: this.PHI.S,
			settings: [],
			params: [ 'CHEEK_L' ],
			compats: []

		}

		const blushRight: ModelConfig = {

			create: (f,r) => drawBlush(f,r),
			use: null,
			owner: null,
			size: this.PHI.S,
			settings: [],
			params: [ 'CHEEK_R' ],
			compats: []

		}

		const jabot: ModelConfig = {

			create: (f,r) => drawJabot(f,r),
			use: null,
			owner: null,
			size: this.SIN.XL,
			settings: [ ],
			params: [ 0.75 ],
			compats: []
		};

		const necklace: ModelConfig = {

			create: (f,r) => drawNecklace(f,r),
			use: null,
			owner: null,
			size: this.SIN.XS,
			settings: [ ],
			params: [ 0.75-0.10, 0.75+0.10 ],
			compats: []
		};

		const earModelTest: ModelConfig = {

			create: (f,r) => drawEarModelTest(f,r),
			use: null,
			owner: null,
			size: this.SIN.XS,
			settings: [ ],
			params: [ 'EAR_L', 0.75 ],
			compats: []
		};


		// -------------------------------------

		antoinette.compats = [ crest, {...panache} ];
		crest.compats = [ {...panache} ];

		// ------------------------------------------------------

		// this._hairModelsCatalog = [  ];
		this._hairModelsCatalog = [ antoinette, pompadour, curlDome ];
		
		// this._hairlinesCatalog = [  ];
		this._hairlinesCatalog = [ hairline, bangLine, mozartLine ];

		this._hairTailsCatalog = [  ];
		// this._hairTailsCatalog = [ cascadeTail, wavyTail ];

		this._earAccessoriesCatalog = [ earModelTest ];

		// this._neckAccessoriesCatalog = [  ];
		this._neckAccessoriesCatalog = [ necklace, jabot ];

		// this._eyeFeaturesCatalog = [];
		this._eyeFeaturesCatalog = [ lashesLeft, lashesRight ];

		// this._eyeFeaturesCatalog = [];
		this._faceFeaturesCatalog = [ blushLeft, blushRight ];

		// this._headFeaturesCatalog = [];
		this._headFeaturesCatalog = [ ];
		
		// ------------------------------------------------------

		
		return this;
	}


	private draw() {

		let plots;
		let sgms;
		let instructions: any;

		// ............................................................

		plots = this.plotter.getPlot( 'wig' );

		for ( const plot of plots ) {

			instructions = plot?.shift();

			plot.forEach( (nPlot: any) => {

				if ( Array.isArray(nPlot) ) {

					const nInstructions: any = nPlot.shift();

					nPlot.forEach( (path) => {

						this[`l${ nInstructions.level }` as keyof Mozart ].addChild( renderHair( path, this._colorScheme, nInstructions.gradient ) )
						
						// path.fullySelected = true;

					});

				} else {

					const path = nPlot;

					this[`l${instructions.level}` as keyof Mozart ].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );
				}
			});
		};



		// ............................................................

		plots = this.plotter.getPlot( 'hairtail' );

		for ( const path of plots ) {

			instructions = path?.shift();
			
			const hairTail = path[0];
		
			hairTail.fullySelected = true;
		};


		// ............................................................

		plots = this.plotter.getPlot( 'hairline' );

		for ( const plot of plots ) {

			instructions = plot?.shift();

			const path = plot[0];

			if ( instructions.complete ) {

				this[`l${instructions.level}` as keyof Mozart ].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );

			} else {

				path.fullySelected = true;

			}

		};

		// -----------------------------------------------------------

		plots = this.plotter.getPlot( 'neckwear');

		for ( const plot of plots ) {

			instructions = plot?.shift();

			plot.forEach( ( nPlot: any ) => {

				if ( Array.isArray( nPlot ) ) {

					instructions = nPlot?.shift();

					nPlot.forEach( (path) => {

						path.fillColor = DEBUG_GREEN;
						path.strokeWidth = 1;
						// path.fullySelected = true;
					});

				} else {

					const path = nPlot;
					// neckwear.fullySelected = true;
				}

			});
		};

		// ............................................................

		plots = this.plotter.getPlot( 'earwear');

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

				const earwear = plot[0];
				// earwear.fullySelected = true;
			}
		};

		// ............................................................

		plots = this.plotter.getPlot( 'eyefeature');

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
				// earwear.fullySelected = true;
				this[`l${instructions.level}` as keyof Mozart].addChild( renderEye( path, this._colorScheme, instructions.gradient ) );
			}
		};


		// ............................................................

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
				// earwear.fullySelected = true;
				this[`l${instructions.level}` as keyof Mozart].addChild( renderFaceFeature( path, this._colorScheme, instructions.gradient ) );
			}
		};

		
		// -----------------------------------------------------------

		
		this.l1.addChild( renderFace( 	this.head.head.getPath(), this._colorScheme ) );
		this.l1.addChild( renderEar( 	this.head.leftEar.getPath(), this._colorScheme ) );
		this.l1.addChild( renderEar( 	this.head.rightEar.getPath(), this._colorScheme  ) );
		this.l1.addChild( renderEye( 	this.face.leftEye.getPath(), this._colorScheme, false ) );
		this.l1.addChild( renderEye( 	this.face.rightEye.getPath(), this._colorScheme, false ) );

		// this.l0.addChild( renderHair( wig ) );
		// this.l2.addChild( renderHair( hairline ) );

		// -----------------------------------------------------------
	
		this.plotter.clear();

	};


	// ------------------------------------------------------------------------------------
	// PUBLIC METHODS


	public generate( params: any ) {

		const { headParams, eyeParams, noseParams, archetypeParams } = params;
		const { } = archetypeParams;

		console.log(`GENERATING BAROQUE`);

		// ...............................................................................

		this._colorScheme = { ...colors.baroquePolka } ;
		this._colorScheme.skin = this._colorScheme.skin[ genRandom(0, this._colorScheme.skin.length-1) ];
		this._colorScheme.hair = this._colorScheme.hair.filter( (c:any) => c !== this._colorScheme.skin );
		this._colorScheme.hair = this._colorScheme.hair[ genRandom(0, this._colorScheme.hair.length-1) ];


		// ...............................................................................
		// NOTE: head and face need to be plotted at generation time to provide all the models based on them the plots they require

		const eyeMinSize = this.PHI.XS * this.PHILESSER;
		const eyeMaxSize = this.PHI.XS;

		this.head.configure();
		this.face.configure( genRandomDec( eyeMinSize, eyeMaxSize ), genRandomDec(0.070, 0.12), genRandomDec( 0.50, 0.60 ) );

		this.face.plot( eyeParams, noseParams );

		// ...............................................................................
		//

		this.generateHair( this._hairModelsCatalog );
		this.generateHairline( this._hairlinesCatalog );
		this.generateHairTail( this._hairTailsCatalog );
		this.generateEarAccessories( this._earAccessoriesCatalog );
		this.generateNeckAccessories( this._neckAccessoriesCatalog );
		this.generateFaceFeatures( this._faceFeaturesCatalog );
		this.generateEyeFeatures( this._eyeFeaturesCatalog );

		// ...............................................................................

	};


	public model( params: any ) {

		const { headParams, eyeParams, noseParams, archetypeParams } = params;
		const { hairlineRidgeCtrl, hairlineLevelCtrl, heightCtrl, curlNumCtrl, spanCtrl, testCtrl } = archetypeParams;

		console.log(`MODELLING BAROQUE`);

		this.clear();

		this.head.plot();
		this.face.plot( eyeParams, noseParams );


		for ( const hair of this.hairModels ) {

			if ( hair.owner ) { hair.use.owner = hair.owner };

			this.plotter.chart( hair.use.plot( archetypeParams, ...hair.params ), 'wig' );
		}

		// .................................................
		// HAIRLINES

		for ( const hairline of this.hairlineModels ) {

			if ( hairline.owner ) { hairline.use.owner = hairline.owner };

			this.plotter.chart( hairline.use.plot( archetypeParams, ...hairline.params ), 'hairline' );
		}

		// .................................................

		for ( const hairTail of this._hairTailModels ) {

			if ( hairTail.owner ) { hairTail.use.owner = hairTail.owner };

			this.plotter.chart( hairTail.use.plot( archetypeParams, this.head.leftEar.anchor, this.head.rightEar.anchor, ...hairTail.params ), 'hairtail' );
		}

		// .................................................
		// NECK ACCESSORIES

		for ( const neckAccessory of this._neckAccessoryModels ) {

			if ( neckAccessory.owner ) { neckAccessory.use.owner = neckAccessory.owner };

			this.plotter.chart( neckAccessory.use.plot( archetypeParams, ...neckAccessory.params ), 'neckwear' );
		}

		// .................................................
		// EAR ACESSORIES

		for ( const earAccessory of this.earAccessoryModels ) {

			if ( earAccessory.owner ) { earAccessory.use.owner = earAccessory.owner };

			this.plotter.chart( earAccessory.use.plot( archetypeParams, ...earAccessory.params ), 'earwear' );
		}


		// .................................................
		// EYE FEATURES

		for ( const eyeFeature of this.eyeFeatureModels ) {

			if ( eyeFeature.owner ) { eyeFeature.use.owner = eyeFeature.owner };

			this.plotter.chart( eyeFeature.use.plot( archetypeParams, ...eyeFeature.params ), 'eyefeature' );
		}


		// .................................................
		// FACE FEATURES

		for ( const faceFeature of this._faceFeatureModels ) {

			if ( faceFeature.owner ) { faceFeature.use.owner = faceFeature.owner };

			this.plotter.chart( faceFeature.use.plot( archetypeParams, ...faceFeature.params ), 'facefeature' );
		}


		this.draw();
	};

};

export default Mozart;


