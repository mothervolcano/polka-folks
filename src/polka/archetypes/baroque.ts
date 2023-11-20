import { Layer, Path } from "paper";

import {
	OrientationType,
	PolarityType,
	IHyperPoint,
	IDisplayObject,
	IAttractor,
	IAttractorField,
	PointLike,
	SizeLike,
} from "../../lib/topo/types";

import Archetype from "../core/archetype";

import { drawPompadourWig } from "../models/pompadourWig";
import { drawAntoinetteWig } from "../models/antoinetteWig";
import { drawHairCurl } from "../models/hairCurl";
import { drawHairline } from "../models/hairline";
import { drawMozartHairline } from "../models/mozartHairline";
import { drawBangHairline } from "../models/bangHairline";
import { HairPanache, drawHairPanache } from "../models/hairPanache";
import { drawHairCrest } from "../models/hairCrest";
import { drawElliWavyTail } from "../models/elliWavyTail";
import { drawArchiCurlCrown } from "../models/archiCurlCrown";
import { drawCascadingTail } from "../models/cascadingTail";
import { Earrings, drawEarrings } from "../models/earrings";
import { drawNecklace } from "../models/necklace";
import { drawJabot } from "../models/jabot";

import { EyeLashes, drawEyeLashes } from "../models/eyeLashes";
import { Blush, drawBlush } from "../models/blush";

import { drawEarModelTest } from "../models/earModelTest";

import * as colors from "../styles/colorSchemes";
import { applyShade } from "../../lib/topo/tools/shaders";
import {
	renderFace,
	renderNose,
	renderEar,
	renderEye,
	renderHair,
	renderFaceFeature,
} from "../renderers/baroque";

import { traceSegment, isEven, genRandom, genRandomDec } from "../../lib/topo/utils/helpers";
import { ModelConfig } from "../types";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class Baroque extends Archetype {
	private _colorScheme: any;

	private l0: any;
	private l1: any;
	private l2: any;
	private l3: any;
	private guides: any;

	constructor(position: any, radius: number) {
		super(position, radius);

		// ---------------------------------------

		this.l0 = new Layer();
		this.l1 = new Layer();
		this.l2 = new Layer();
		this.l3 = new Layer();
		this.guides = new Layer();

		this.frame.addChildren([this.l0, this.l1, this.l2, this.l3, this.guides]);

		// ---------------------------------------

		this._colorScheme = colors.defaultPolka;

		// ---------------------------------------

		const antoinette: ModelConfig = {
			type: "hair",
			order: "first",
			create: (f, r) => drawAntoinetteWig(f, r),
			use: null,
			base: null,
			size: this.PHI.XL,
			settings: [[this.PHI.L, this.PHI.XL], [this.SIN.L, this.SIN.S], [0.2]],
			params: [0.25],
			compats: [],
		};

		const pompadour: ModelConfig = {
			type: "hair",
			order: "first",
			create: (f, r) => drawPompadourWig(f, r),
			use: null,
			base: null,
			size: this.SIN.XL,
			settings: [[this.PHI.L, this.PHI.XL], [this.SIN.L, this.SIN.S], [0.2]],
			params: [0.25],
			compats: [],
		};

		const curlDome: ModelConfig = {
			type: "hair",
			order: "first",
			create: (f, r) => drawArchiCurlCrown(f, r),
			use: null,
			base: null,
			size: this.PHI.XL,
			settings: [[this.PHI.M], [this.PHI.L], [3], [0.1]],
			params: [0.25],
			compats: [],
		};

		const crest: ModelConfig = {
			type: "hair",
			order: "second",
			create: (f, r) => drawHairCrest(f, r),
			use: null,
			base: null,
			size: this.PHI.L,
			settings: [],
			params: [0.25, 0.1],
			compats: [],
		};

		const panache: ModelConfig = {
			type: "hair",
			order: "second",
			create: (f, r) => new HairPanache(f, r),
			use: null,
			base: null,
			size: this.PHI.M,
			settings: [],
			params: [0.25],
			compats: [],
		};

		const hairline: ModelConfig = {
			type: "hairline",
			order: "first",
			create: (f, r) => drawHairline(f, r),
			use: null,
			base: this.head,
			size: this.PHI.M,
			settings: [],
			params: ["L_EAR_XT", "R_EAR_XT", 0.25],
			compats: [],
		};

		const bangLine: ModelConfig = {
			type: "hairline",
			order: "first",
			create: (f, r) => drawBangHairline(f, r),
			use: null,
			base: this.head,
			size: this.PHI.M,
			settings: [],
			params: ["L_EAR_XT", "R_EAR_XT", 0.25],
			compats: [],
		};

		const mozartLine: ModelConfig = {
			type: "hairline",
			order: "first",
			create: (f, r) => drawMozartHairline(f, r),
			use: null,
			base: this.head,
			size: this.PHI.M,
			settings: [],
			params: ["L_EAR_XT", "R_EAR_XT", 0.25],
			compats: [],
		};

		const cascadeTail: ModelConfig = {
			type: "hairtail",
			order: "first",
			create: (f, r) => drawCascadingTail(f, r),
			use: null,
			base: null,
			size: this.PHI.L,
			settings: [],
			params: [0.25],
			compats: [],
		};

		const wavyTail: ModelConfig = {
			type: "hairtail",
			order: "first",
			create: (f, r) => drawElliWavyTail(f, r),
			use: null,
			base: null,
			size: this.SIN.XL,
			settings: [[this.PHI.XL], [this.SIN.L]],
			params: [0.25],
			compats: [],
		};

		const earringLeft: ModelConfig = {
			type: "earwear",
			order: "first",
			create: (f, r) => drawEarrings(f, r),
			use: null,
			base: this.head,
			size: this.SIN.XS,
			settings: [],
			params: ["EAR_L", 0.75],
			compats: [],
		};

		const earringRight: ModelConfig = {
			type: "earwear",
			order: "first",
			create: (f, r) => drawEarrings(f, r),
			use: null,
			base: this.head,
			size: this.SIN.XS,
			settings: [],
			params: ["EAR_R", 0.75],
			compats: [],
		};

		const lashesLeft: ModelConfig = {
			type: "eyefeature",
			order: "first",
			create: (f, r) => drawEyeLashes(f, r),
			use: null,
			base: this.face,
			size: this.SIN.XS,
			settings: [],
			params: ["EYE_L", 0.75],
			compats: [],
		};

		const lashesRight: ModelConfig = {
			type: "eyefeature",
			order: "first",
			create: (f, r) => drawEyeLashes(f, r),
			use: null,
			base: this.face,
			size: this.SIN.XS,
			settings: [],
			params: ["EYE_R", 0.75],
			compats: [],
		};

		const blushLeft: ModelConfig = {
			type: "facefeature",
			order: "first",
			create: (f, r) => drawBlush(f, r),
			use: null,
			base: this.face,
			size: this.PHI.S,
			settings: [],
			params: ["CHEEK_L"],
			compats: [],
		};

		const blushRight: ModelConfig = {
			type: "facefeature",
			order: "first",
			create: (f, r) => drawBlush(f, r),
			use: null,
			base: this.face,
			size: this.PHI.S,
			settings: [],
			params: ["CHEEK_R"],
			compats: [],
		};

		const jabot: ModelConfig = {
			type: "neckwear",
			order: "first",
			create: (f, r) => drawJabot(f, r),
			use: null,
			base: null,
			size: this.SIN.XL,
			settings: [],
			params: [0.75],
			compats: [],
		};

		const necklace: ModelConfig = {
			type: "neckwear",
			order: "first",
			create: (f, r) => drawNecklace(f, r),
			use: null,
			base: null,
			size: this.SIN.XS,
			settings: [],
			params: [0.75 - 0.1, 0.75 + 0.1],
			compats: [],
		};

		const earModelTest: ModelConfig = {
			type: "earwear",
			order: "first",
			create: (f, r) => drawEarModelTest(f, r),
			use: null,
			base: this.head,
			size: this.SIN.XS,
			settings: [],
			params: ["EAR_L", 0.75],
			compats: [],
		};

		const debugCrest: ModelConfig = {
			type: "hair",
			order: "first",
			create: (f, r) => drawHairCrest(f, r),
			use: null,
			base: null,
			size: this.PHI.L,
			settings: [],
			params: [0.25, 0.1],
			compats: [],
		};

		// -------------------------------------

		antoinette.compats = [crest, { ...panache }];
		crest.compats = [{ ...panache }];

		this.pool = [
			antoinette,
			pompadour,
			curlDome,
			crest,
			panache,
			hairline,
			bangLine,
			mozartLine,
			cascadeTail,
			wavyTail,
			earringLeft,
			earringRight,
			lashesLeft,
			lashesRight,
			blushLeft,
			blushRight,
			jabot,
			necklace,
			earModelTest,
		];

		/* DEBUG */

		// antoinette.compats = [crest];

		// this.pool = [
		//     antoinette,
		// 	debugCrest
		// ]

		// -----------------------------------------------------

		return this;
	}

	// ------------------------------------------------------------------------------------
	// PUBLIC METHODS

	public generate(params: any) {
		const { baseParams, archetypeParams } = params;
		const {} = archetypeParams;

		// ...............................................................................

		this._colorScheme = { ...colors.baroquePolka };
		this._colorScheme.skin =
			this._colorScheme.skin[genRandom(0, this._colorScheme.skin.length - 1)];
		this._colorScheme.hair = this._colorScheme.hair.filter(
			(c: any) => c !== this._colorScheme.skin,
		);
		this._colorScheme.hair =
			this._colorScheme.hair[genRandom(0, this._colorScheme.hair.length - 1)];

		// ...............................................................................
		// NOTE: head and face need to be plotted at generation time to provide all the models based on them the plots they require

		const eyeMinSize = this.PHI.XS * this.PHILESSER;
		const eyeMaxSize = this.PHI.XS;

		this.head.configure();
		this.face.configure(
			genRandomDec(eyeMinSize, eyeMaxSize),
			genRandomDec(0.07, 0.12),
			genRandomDec(0.5, 0.6),
		);

		this.face.plot(baseParams);

		// ...............................................................................
		//

		this.collection = [];

		this.mount("hair");
		this.mount("hairline");
		this.mount("earwear");
		this.mount("neckwear");
		this.mount("facefeature");
		this.mount("eyefeature");

		// ...............................................................................
	}

	public draw(params: any) {
		const { baseParams, archetypeParams } = params;
		const {
			hairlineRidgeCtrl,
			hairlineLevelCtrl,
			heightCtrl,
			curlNumCtrl,
			spanCtrl,
			testCtrl,
		} = archetypeParams;

		this.clear();

		this.head.plot(baseParams);
		this.face.plot(baseParams);

		for (const modelConfig of this.collection) {
			if (!modelConfig.use) {
				throw new Error(
					`ERROR @ Baroque: model config is missing an instance of the model`,
				);
			}

			this.plotter.chart(
				modelConfig.use.plot(archetypeParams, ...modelConfig.params),
				modelConfig.type,
			);
		}

		this.render();
	}

	private render() {
		let plots;
		let sgms;
		let instructions: any;

		// ............................................................

		plots = this.plotter.getPlot("hair");

		for (const plot of plots) {
			instructions = plot?.shift();

			plot.forEach((nPlot: any) => {
				if (Array.isArray(nPlot)) {
					const nInstructions: any = nPlot.shift();

					nPlot.forEach((path) => {
						this[`l${nInstructions.level}` as keyof Baroque].addChild(
							renderHair(path, this._colorScheme, nInstructions.gradient),
						);

						// path.fullySelected = true;
					});
				} else {
					const path = nPlot;

					this[`l${instructions.level}` as keyof Baroque].addChild(
						renderHair(path, this._colorScheme, instructions.gradient),
					);

					console.log(`hair model instructions: `, instructions);
				}
			});
		}

		// ............................................................

		plots = this.plotter.getPlot("hairtail");

		for (const path of plots) {
			instructions = path?.shift();

			const hairTail = path[0];

			hairTail.fullySelected = true;
		}

		// ............................................................

		plots = this.plotter.getPlot("hairline");

		for (const plot of plots) {
			instructions = plot?.shift();

			const path = plot[0];

			if (instructions.complete) {
				this[`l${instructions.level}` as keyof Baroque].addChild(
					renderHair(path, this._colorScheme, instructions.gradient),
				);
			} else {
				path.fullySelected = true;
			}
		}

		// -----------------------------------------------------------

		plots = this.plotter.getPlot("neckwear");

		for (const plot of plots) {
			instructions = plot?.shift();

			plot.forEach((nPlot: any) => {
				if (Array.isArray(nPlot)) {
					instructions = nPlot?.shift();

					nPlot.forEach((path) => {
						path.fillColor = DEBUG_GREEN;
						path.strokeWidth = 1;
						// path.fullySelected = true;
					});
				} else {
					const path = nPlot;
					// neckwear.fullySelected = true;
				}
			});
		}

		// ............................................................

		plots = this.plotter.getPlot("earwear");

		for (const plot of plots) {
			instructions = plot?.shift();

			if (Array.isArray(plot[0])) {
				const nPlot = plot[0];
				instructions = nPlot?.shift();

				nPlot.forEach((path) => {
					path.strokeColor = DEBUG_GREEN;
					path.strokeWidth = 1;
					// path.fullySelected = true;
				});
			} else {
				const earwear = plot[0];
				// earwear.fullySelected = true;
			}
		}

		// ............................................................

		plots = this.plotter.getPlot("eyefeature");

		for (const plot of plots) {
			instructions = plot?.shift();

			if (Array.isArray(plot[0])) {
				const nPlot = plot[0];
				instructions = nPlot?.shift();

				nPlot.forEach((path) => {
					path.strokeColor = DEBUG_GREEN;
					path.strokeWidth = 1;
					// path.fullySelected = true;
				});
			} else {
				const path = plot[0];
				// earwear.fullySelected = true;
				this[`l${instructions.level}` as keyof Baroque].addChild(
					renderEye(path, this._colorScheme, instructions.gradient),
				);
			}
		}

		// ............................................................

		plots = this.plotter.getPlot("facefeature");

		for (const plot of plots) {
			instructions = plot?.shift();

			if (Array.isArray(plot[0])) {
				const nPlot = plot[0];
				instructions = nPlot?.shift();

				nPlot.forEach((path) => {
					path.strokeColor = DEBUG_GREEN;
					path.strokeWidth = 1;
					// path.fullySelected = true;
				});
			} else {
				const path = plot[0];
				// earwear.fullySelected = true;
				this[`l${instructions.level}` as keyof Baroque].addChild(
					renderFaceFeature(path, this._colorScheme, instructions.gradient),
				);
			}
		}

		// -----------------------------------------------------------

		this.l1.addChild(renderFace(this.head.getAtt("HEAD").getPath(), this._colorScheme));
		this.l1.addChild(renderEar(this.head.getAtt("EAR_L").getPath(), this._colorScheme));
		this.l1.addChild(renderEar(this.head.getAtt("EAR_R").getPath(), this._colorScheme));
		this.l1.addChild(renderEye(this.face.getAtt("EYE_L").getPath(), this._colorScheme, false));
		this.l1.addChild(renderEye(this.face.getAtt("EYE_R").getPath(), this._colorScheme, false));

		// -----------------------------------------------------------

		this.plotter.clear();
	}
}

export default Baroque;
