import { Layer, Path } from 'paper';

import Archetype from './archetype';

import { drawHairDome } from '../models/hairDome';
import { drawHairCapeTail } from '../models/hairCapeTail';
import { drawHairCurtainHide } from '../models/hairCurtainHide';
import { drawHairband } from '../models/hairband';
import { drawArcWave } from '../models/arcWave';
import { drawRoundGlasses } from '../models/roundGlasses';
import { drawEarrings } from '../models/earrings';
import { drawJabot } from '../models/jabot';
import { drawNecklace } from '../models/necklace';

import * as colors from '../styles/colorSchemes'
import { applyShade } from '../../lib/topo/tools/shaders';

import { renderFace, renderNose, renderEar, renderEye, renderHair } from '../renderers/default';

import { markPoint, traceSegment, isEven } from '../../lib/topo/utils/helpers'

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class Monk extends Archetype {

	
	private _hair;
	private _glasses;

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

	constructor( position: any, size: any ) {

		
		super( position, size );



		// ---------------------------------------
		
		this.l0 = new Layer();
		this.l1 = new Layer();
		this.l2 = new Layer();
		this.l3 = new Layer();
		this.guides = new Layer();

		this.frame.addChildren([ this.l0, this.l1, this.l2, this.l3, this.guides ]);
 
		// ---------------------------------------

		// this._hair = null;
		// this._hairPattern = null;
		// this._glasses = null;

		return this;
	}


	private draw() {

		// // this.frame.removeChildren();
		// this.frame.children.forEach( (child) => child.removeChildren() );
		// // this.frame.activate();
		// this.guides.activate();

		// // --------------------------------------------------------


		// // const nose = this._face.nose.getPath();

		// const nose = new Path({

		// 	segments: this._face.nose,
		// 	strokeColor: DEBUG_GREEN,
		// 	closed: true
		// });

		// // nose.fullySelected = true;


		// // --------------------------------------------------------

		// let sgms;
		// let instructions;
		
		// // --------------------------------------------------------

		// sgms = this.plotter.getPlot('crown')[0];
		// instructions = sgms.shift();
		
		// const crown = new Path({

		// 	strokeColor: DEBUG_GREEN,
		// 	strokeWith: 2
		// });

		// this.pen.setPath( crown );

		// this.pen.add( sgms[0] );
		// this.pen.add( sgms[1] );
		// this.pen.add( sgms[2] );
		// this.pen.add( sgms[3] );
		// this.pen.add( sgms[4] );
		// this.pen.add( sgms[5] );

		// this.pen.mirrorRepeat('HOR');

		
		// // --------------------------------------------------------

		// sgms = this.plotter.getPlot('pattern')//[0];
		// instructions = sgms.shift();

		
		// const pattern = new Path({

		// 	strokeColor: DEBUG_GREEN,
		// 	strokeWidth: 3
		// });

		// this.pen.setPath( pattern );

		// this.pen.add( sgms[0] );
		// // this.pen.add( sgms[1] );
		// // this.pen.add( sgms[2] );
		// // this.pen.add( sgms[3] );
		// // this.pen.add( sgms[4] );
		// // this.pen.add( sgms[5] );
		// // this.pen.add( sgms[6] );

		// // pattern.fullySelected = true;

		// pattern.reverse();
		// crown.join( pattern );


		// // -----------------------------------------------------

		// sgms = this.plotter.getPlot('glasses')?.[0];
		// instructions = sgms?.shift();

		// sgms?.forEach( ( plot ) => {

		// 	instructions = plot.shift();
			
		// 	plot.forEach( ( path ) => {

		// 		path.strokeColor = DEBUG_GREEN;

		// 	});

		// });


		// // -----------------------------------------------------

		// sgms = this.plotter.getPlot('earrings')?.[0];
		// instructions = sgms?.shift();

		// sgms?.forEach( ( plot ) => {

		// 	instructions = plot.shift();
			
		// 	const path = new Path({

		// 		segments: plot,
		// 		fillColor: DEBUG_GREEN,
		// 		closed: true

		// 	});

		// 	this.pen.setPath( path );

		// 	this.pen.add( plot );

		// });


		// // -----------------------------------------------------

		// sgms = this.plotter.getPlot('jabot')?.[0];
		// instructions = sgms?.shift();

		// sgms?.forEach( ( plot ) => {

		// 	instructions = plot.shift();

		// 	const path = new Path({

		// 		segments: plot,
		// 		fillColor: DEBUG_GREEN,
		// 		closed: true

		// 	});

		// 	this.pen.setPath( path );

		// 	this.pen.add( plot );

		// 	path.fullySelected = true;

		// });


		// // -----------------------------------------------------

		// sgms = this.plotter.getPlot('necklace')?.[0];
		// instructions = sgms?.shift();


		// sgms?.forEach( ( plot ) => {

		// 	instructions = plot.shift();

		// 	plot.forEach( (path) => {

		// 		path.fillColor = DEBUG_GREEN;

		// 	});

		// 	// path.fullySelected = true;
		// });

		
		// // -----------------------------------------------------

		// sgms = this.plotter.getPlot('curtain')?.[0];
		// instructions = sgms?.shift();

		// const curtain = new Path({

		// 	strokeColor: DEBUG_GREEN,
		// 	strokeWidth: 1
		// });

		// sgms?.forEach( ( plot ) => {

		// 	instructions = plot.shift();

		// 	const path = new Path({

		// 		strokeColor: DEBUG_GREEN
		// 	});

		// 	this.pen.setPath( path );
		// 	this.pen.add( plot );

		// 	curtain.join( path );

		// });

		// curtain.join( this.head.head.extractPath( curtain.lastSegment, curtain.firstSegment ) );

		// // -----------------------------------------------------

		// sgms = this.plotter.getPlot('hairband')?.[0];
		// instructions = sgms?.shift();

		// const hairband = new Path({

		// 	fillColor: DEBUG_GREEN,
		// 	strokeWidth: 1
		// });

		// sgms?.forEach( ( plot ) => {

		// 	instructions = plot.shift();

		// 	const path = new Path({

		// 		strokeColor: DEBUG_GREEN,
		// 		strokeWidth: 1
		// 	});

		// 	this.pen.setPath( path );
		// 	this.pen.add( plot );

		// 	hairband.join( path );

		// });

		// // -----------------------------------------------------


		// this.l1.addChild( renderFace( this.head.head.getPath() ) );
		// this.l1.addChild( renderEar( this.head.leftEar.getPath() ) );
		// this.l1.addChild( renderEar( this.head.rightEar.getPath() ) );

		// this.l1.addChild( renderEye( this.face.leftEye.getPath() ) );
		// this.l1.addChild( renderEye( this.face.rightEye.getPath() ) );

		// this.l1.addChild( renderNose( nose) );
		
		// this.l0.addChild( renderHair( crown ) );
		// this.l3.addChild( renderHair( curtain ) );

		// this.plotter.clear();

	};


	// ------------------------------------------------------------------------------------
	// PUBLIC METHODS


	public generate( params ) {

		// const { headParams, eyeParams, noseParams, archetypeParams } = params;	
		// const { numCtrl, latCtrl } = archetypeParams;

		// console.log(`GENERATING MONK: ${ archetypeParams }`);
		
		// /* DEBUG */ const _layer = new Layer();
		// _layer.activate();


		// this.head.configure();
		// this.face.configure();

		// // ------------------------------------------------------------------

		// this._hair = drawHairBacktail;
		// this._hairPattern = drawCloudWave;
		// this._glasses = drawRoundGlasses;

		// // ------------------------------------------------------------------

		// this._hair( this.field, this.size );
		// // this._hair().configure( 0.15, this.ruler.sin.S(), this.ruler.sin.S() );
		// this._hair().configure( this.SIN.M );

		// this._hairPattern( this.field, this.size );
		// this._hairPattern().configure( numCtrl, 10, this.SIN.M );

		// drawHairCurtainHide( this.field, this.size );
		// drawHairCurtainHide().configure();		

		// drawHairband( this.field, this.size );
		// drawHairband().configure();

		// this._glasses( this.field, this.size );
		// this._glasses().configure();
		
		// drawEarrings( this.field, this.PHI.XS );
		// drawEarrings().configure();

		// // useJabot( this._head.head.position, this.ruler.phi.M() );
		// // useJabot().configure();

		// drawNecklace( this.field, this.PHI.M );
		// drawNecklace().configure();

	};


	public model( params ) {

		// const { headParams, eyeParams, noseParams, archetypeParams } = params;
		// const { numCtrl, latCtrl, cutoffCtrl, volCtrl, roundnessCtrl, indentCtrl } = archetypeParams;
		
		// console.log(`MODELLING MONK: ${ Object.keys(eyeParams) }`);

		// this.head.plot();
		// this.face.plot( eyeParams, noseParams );

		// this.plotter.chart( this._hair().plot( this.head.head.locate(0.25) ), 'crown' );
		// this.plotter.chart( drawHairCurtainHide().plot( this.head.getPin('L_EAR_XT').position, this.head.getPin('R_EAR_XT').position ), 'curtain' );
		// this.plotter.chart( drawHairband().plot( this.head.head.locate(0.25 - 0.17).position, this.head.head.locate(0.25 + 0.17).position, 0.25 ), 'hairband' );
		// // this.plotter.chart( this._hair().plot( latCtrl, cutoffCtrl, volCtrl ), 'crown' );
		// // this.plotter.chart( this._hairPattern().plot( this._hair().A, this._hair().B, numCtrl, roundnessCtrl, indentCtrl ), 'pattern' );
		// this.plotter.chart( this._glasses().plot( this.face.getPin('L_EYE_C'), this.face.getPin('R_EYE_C') ), 'glasses' );
		// this.plotter.chart( drawEarrings().plot( this.head.getPin('L_EAR_CB'), this.head.getPin('R_EAR_CB') ), 'earrings' );
		// // this.plotter.chart( useJabot().plot( this._head.head.locate(0.75) ), 'jabot' );
		// this.plotter.chart( drawNecklace().plot( this.head.head.locate( 0.75 - 0.10 ), this.head.head.locate( 0.75 + 0.10 ) ), 'necklace' );

		// this.draw();

	};

}


export default Monk;

