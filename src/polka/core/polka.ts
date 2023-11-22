import { Layer, Path } from "paper";
import { paper } from "../../components/paperStage";

import Plotter from "../../lib/topo/tools/plotter";
import OrbitalField from "../attractors/orbitalField";
import { convertToHyperPoint } from "../../lib/topo/utils/converters";

import { IModel, MetricScale, MetricScaleType, MetricUnit, ModelConfig } from "../types";
import { drawHead } from "../models/head";
import { drawFace } from "../models/face";

import * as colors from "../styles/colorSchemes";

import { traceSegment, isEven, genRandom, genRandomDec } from "../../lib/topo/utils/helpers";
import {
	renderEar,
	renderEye,
	renderFace,
	renderFaceFeature,
	renderHair,
} from "../renderers/baroque";
import { PHIGREATER, PHILESSER, SIN54, PHI, SIN, generateScaleFor } from "../styles/metrics";

// ------------------------
// DEBUG

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

// ---------------------------------------------------------------------
// AUX

function pickModel(catalog: ModelConfig[]) {
	return catalog[genRandom(0, catalog.length - 1)];
}

// function randomize(input: any) {
// 	if (Array.isArray(input) && input.length === 1) {
// 		return input[0];
// 	} else if (!Array.isArray(input)) {
// 		return input;
// 	}

// 	return genRandomDec(input[0], input[1]);
// }

// ---------------------------------------------------------------------

abstract class Polka {
	#plotter: any;

	#collection: ModelConfig[] = [];

	#field: any;

	#head: IModel;
	#face: IModel;

	#frame: any;

	#l0: any;
	#l1: any;
	#l2: any;
	#l3: any;
	#guides: any;

	#colorScheme: any;

	#PHI: MetricScale;
	#SIN: MetricScale;

	constructor(position: any, radius: number) {
		this.#field = new OrbitalField(convertToHyperPoint(position), radius);
		this.#plotter = Plotter.getInstance();

		this.#PHI = generateScaleFor("PHI", radius);
		this.#SIN = generateScaleFor("SIN", radius);

		this.#l0 = new Layer();
		this.#l1 = new Layer();
		this.#l2 = new Layer();
		this.#l3 = new Layer();
		this.#guides = new Layer();

		this.#frame = new Layer();
		this.#frame.addChildren([this.#l0, this.#l1, this.#l2, this.#l3, this.#guides]);

		this.#head = drawHead(this.#field, radius);
		this.#face = drawFace(this.#field, radius);

		this.#colorScheme = colors.defaultPolka;
	}

	private getLayer(level: number) {
		switch (level) {
			case 0:
				return this.#l0;
			case 1:
				return this.#l1;
			case 2:
				return this.#l2;
			case 3:
				return this.#l3;
		}
	}

	private getScale(scale: MetricScaleType) {
		switch (scale) {
			case "PHI":
				return this.#PHI;
			case "SIN":
				return this.#SIN;
			default:
				throw new Error(`ERROR @Polka.getScale: ${scale} is an invalid scale`);
		}
	}

	private isMetricUnit(input: any): input is MetricUnit {
		if (typeof input === "number" || typeof input === "string") {
			return false;
		}

		return (
			input &&
			"scale" in input &&
			typeof input.scale === "string" &&
			"unit" in input &&
			typeof input.unit === "string"
		);
	}

	private parseModel(name: string | IModel) {
		if (typeof name === "string") {
			switch (name) {
				case "HEAD":
					console.log("baseModel in config: ", this.#head);
					return this.#head;
				case "FACE":
					console.log("baseModel in config: ", this.#face);
					return this.#face;
				default:
					throw new Error(`ERROR @Polka.mount: ${name} is not a valid model`);
			}
		} else {
			return name;
		}
	}

	private parseMetric(value: MetricUnit | number): number {
		if (this.isMetricUnit(value)) {
			return this.getScale(value.scale)[value.unit];
		} else {
			return value;
		}
	}


	private parseParameter(value: string | number | MetricUnit) {
		if (this.isMetricUnit(value)) {
			return this.getScale(value.scale)[value.unit];
		} else {
			return value;
		}
	}


	private randomize(input: any) {
		if (Array.isArray(input) && input.length === 1) {
			return this.parseParameter(input[0]);
		} else if (!Array.isArray(input)) {
			return this.parseParameter(input);
		}

		const min = this.parseParameter(input[0]);
		const max = this.parseParameter(input[1]);

		console.log(`randomize: ${typeof min} min: ${min} - ${typeof max} max: ${max}`);

		if (typeof min !== "number" || typeof max !== "number") {
			throw new Error(`ERROR @Polka.mount: can't generate random value. Invalid input`);
			// console.log(`WARNING! passing non-numeric parameters to randomize function. min: ${min} - max: ${max}`);
		}

		return genRandomDec(min, max);
	}

	private mount(pool: ModelConfig[], type: string) {
		// Picks the first random hair model from the archetype's catalog and adds it to the queue
		const modelQueue = [pickModel(pool.filter((m) => m.type === type && m.order === "first"))];

		while (modelQueue.length > 0 && modelQueue[0] !== undefined) {
			//
			const modelConfig = modelQueue.shift();

			if (!modelConfig) {
				throw new Error(`ERROR @ Archetype: failed to retrieve ${type} Model from queue`);
			}

			modelConfig.use = modelConfig.create(
				this.#head.field,
				this.parseMetric(modelConfig.size),
			);

			if (modelConfig.base) {
				modelConfig.use.baseOn(this.parseModel(modelConfig.base));
			}

			modelConfig.use.configure(...modelConfig.settings.map((p: any[]) => this.randomize(p)));

			this.#collection.push(modelConfig);

			// Check if there are sub-models

			if (modelConfig.compats.length > 0) {
				const nModelConfig = pickModel(modelConfig.compats);

				// nModelConfig.base = modelConfig.use;
				nModelConfig.use = nModelConfig.create(
					modelConfig.use.field,
					this.parseMetric(nModelConfig.size),
				);
				nModelConfig.use.baseOn(modelConfig.use);
				nModelConfig.use.configure(
					...modelConfig.settings.map((p: any[]) => this.randomize(p)),
				);

				modelQueue.push(nModelConfig);
			}
		}
	}

	public generate(pool: ModelConfig[], layers: string[], params: any) {
		const { baseParams, archetypeParams } = params;

		this.#colorScheme = { ...colors.baroquePolka };
		this.#colorScheme.skin =
			this.#colorScheme.skin[genRandom(0, this.#colorScheme.skin.length - 1)];
		this.#colorScheme.hair = this.#colorScheme.hair.filter(
			(c: any) => c !== this.#colorScheme.skin,
		);
		this.#colorScheme.hair =
			this.#colorScheme.hair[genRandom(0, this.#colorScheme.hair.length - 1)];

		// ...............................................................................
		// NOTE: head and face need to be plotted at generation time to provide all the models based on them the plots they require

		const eyeMinSize = this.#PHI.XS * PHILESSER;
		const eyeMaxSize = this.#PHI.XS;

		this.#head.configure();
		this.#face.configure(
			genRandomDec(eyeMinSize, eyeMaxSize),
			genRandomDec(0.07, 0.12),
			genRandomDec(0.5, 0.6),
		);

		this.#face.plot(baseParams);

		// ...............................................................................
		//

		this.#collection = [];

		this.mount(pool, "hair");
		this.mount(pool, "hairline");
		this.mount(pool, "earwear");
		this.mount(pool, "neckwear");
		this.mount(pool, "facefeature");
		this.mount(pool, "eyefeature");
		this.mount(pool, "eyewear");
	}

	public draw(params: any) {
		const { baseParams, archetypeParams } = params;

		this.clear();

		this.#head.plot(baseParams);
		this.#face.plot(baseParams);

		for (const modelConfig of this.#collection) {
			if (!modelConfig.use) {
				throw new Error(
					`ERROR @ Baroque: model config is missing an instance of the model`,
				);
			}

			const plot = modelConfig.use.plot(archetypeParams, ...modelConfig.params);

			if (plot.type === "earwear") {
				console.log('----->', plot)
			}

			this.#plotter.chart(
				plot,
				modelConfig.type,
			);
		}

		this.render();
	}

	protected render() {
		let plots;
		let sgms;
		let instructions: any;

		// ............................................................

		plots = this.#plotter.getPlot("hair");

		for (const plot of plots) {
			instructions = plot?.shift();

			plot.forEach((nPlot: any) => {
				if (Array.isArray(nPlot)) {
					const nInstructions: any = nPlot.shift();

					nPlot.forEach((path) => {
						this.getLayer(instructions.level).addChild(
							renderHair(path, this.#colorScheme, nInstructions.gradient),
						);

						// path.fullySelected = true;
					});
				} else {
					const path = nPlot;

					this.getLayer(instructions.level).addChild(
						renderHair(path, this.#colorScheme, instructions.gradient),
					);

					console.log(`hair model instructions: `, instructions);
				}
			});
		}

		// ............................................................

		plots = this.#plotter.getPlot("hairtail");

		for (const path of plots) {
			instructions = path?.shift();

			const hairTail = path[0];

			hairTail.fullySelected = true;
		}

		// ............................................................

		plots = this.#plotter.getPlot("hairline");

		for (const plot of plots) {
			instructions = plot?.shift();

			const path = plot[0];

			if (instructions.complete) {
				this.getLayer(instructions.level).addChild(
					renderHair(path, this.#colorScheme, instructions.gradient),
				);
			} else {
				path.fullySelected = true;
			}
		}

		// -----------------------------------------------------------

		plots = this.#plotter.getPlot("neckwear");

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

		// plots = this.#plotter.getPlot("earwear");

		// for (const plot of plots) {
		// 	instructions = plot?.shift();

		// 	if (Array.isArray(plot[0])) {
		// 		const nPlot = plot[0];
		// 		instructions = nPlot?.shift();

		// 		nPlot.forEach((path) => {
		// 			path.strokeColor = DEBUG_GREEN;
		// 			path.strokeWidth = 1;
		// 			// path.fullySelected = true;
		// 		});
		// 	} else {
		// 		const earwear = plot[0];
		// 		// earwear.fullySelected = true;
		// 	}
		// }

		// ............................................................

		plots = this.#plotter.getPlot("eyefeature");

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
				this.getLayer(instructions.level).addChild(
					renderEye(path, this.#colorScheme, instructions.gradient),
				);
			}
		}

		// ............................................................

		plots = this.#plotter.getPlot("facefeature");

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
				this.getLayer(instructions.level).addChild(
					renderFaceFeature(path, this.#colorScheme, instructions.gradient),
				);
			}
		}

		// ............................................................

		plots = this.#plotter.getPlot("glasses");

		for (const plot of plots) {
			instructions = plot?.shift();

			if (Array.isArray(plot[0])) {
				const nPlot = plot[0];
				instructions = nPlot?.shift();

				nPlot.forEach((path) => {
					path.strokeColor = colors.CHART.get(this.#colorScheme.skin).contrast.hex;
					path.strokeWidth = instructions.thickness;

					this.getLayer(instructions.level).addChild(path);
				});
			} else {
				const path = plot[0];

				if (instructions.complete) {
					// this[`l${instructions.level}`].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );
				} else {
					path.fullySelected = true;
				}
			}
		}

		// -----------------------------------------------------------

		this.#l1.addChild(renderFace(this.#head.getAtt("HEAD").getPath(), this.#colorScheme));
		this.#l1.addChild(renderEar(this.#head.getAtt("EAR_L").getPath(), this.#colorScheme));
		this.#l1.addChild(renderEar(this.#head.getAtt("EAR_R").getPath(), this.#colorScheme));
		this.#l1.addChild(
			renderEye(this.#face.getAtt("EYE_L").getPath(), this.#colorScheme, false),
		);
		this.#l1.addChild(
			renderEye(this.#face.getAtt("EYE_R").getPath(), this.#colorScheme, false),
		);

		// -----------------------------------------------------------

		this.#plotter.clear();
	}

	public clear() {
		this.#frame.children.forEach((child: any) => child.removeChildren());

		const allOtherLayers = paper.project.layers.filter((l) => l.id !== this.#frame.id);
		allOtherLayers.forEach((layer) => layer.removeChildren());
	}
}

export default Polka;
