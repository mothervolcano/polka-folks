import { Layer, Path } from "paper";
import { paper } from "components/paperStage";

import { IAttractorField } from "lib/topo/types";
import { convertToHyperPoint } from "lib/topo/utils/converters";
import { traceSegment, isEven, genRandom, genRandomDec } from "lib/topo/utils/helpers";

import { IModel, MetricScale, MetricScaleType, MetricUnit, ModelConfig } from "polka/types";
import OrbitalField from "polka/attractors/orbitalField";
import { drawHead } from "polka/models/bases/head";
import { drawFace } from "polka/models/bases/face";
import { PHIGREATER, PHILESSER, SIN54, PHI, SIN, generateScaleFor } from "../styles/metrics";

import { model } from "stage";

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
	#collection: ModelConfig[] = [];
	#compositions: any[] = [];

	#field: IAttractorField;

	#head: IModel;
	#face: IModel;

	#frame: any;

	#l0: any;
	#l1: any;
	#l2: any;
	#l3: any;
	#l4: any;
	#l5: any;
	#guides: any;

	#colorScheme: any;

	#PHI: MetricScale;
	#SIN: MetricScale;

	constructor(position: any, radius: number) {
		this.#field = new OrbitalField(convertToHyperPoint(position), radius);

		this.#PHI = generateScaleFor("PHI", radius);
		this.#SIN = generateScaleFor("SIN", radius);

		this.#l0 = new Layer();
		this.#l1 = new Layer();
		this.#l2 = new Layer();
		this.#l3 = new Layer();
		this.#l4 = new Layer();
		this.#l5 = new Layer();
		this.#guides = new Layer();

		this.#frame = new Layer();
		this.#frame.addChildren([this.#l0, this.#l1, this.#l2, this.#l3, this.#l4, this.#l5, this.#guides]);

		this.#head = drawHead(this.#field.attractor) as IModel;
		this.#face = drawFace(this.#field.attractor) as IModel;

		this.#head.setLevel(1);
		this.#face.setLevel(2);
	}

	get head() {
		return this.#head;
	}

	get face() {
		return this.#face;
	}

	set colorScheme(scheme: any) {
		this.#colorScheme = scheme;
	}

	get colorScheme() {
		return this.#colorScheme;
	}

	get compositions() {
		return this.#compositions;
	}

	protected getLayer(level: number) {
		// Cap the level value
		if (level < -2) {
			level = -2;
		} else if (level > 3) {
			level = 3;
		}

		switch (level) {
			case -2:
				return this.#l0;
			case -1:
				return this.#l1;
			case 0:
				return this.#l2;
			case 1:
				return this.#l3;
			case 2:
				return this.#l4;
			case 3:
				return this.#l5;
			default:
				throw new Error(`${level} is not a valid level value.`);
		}
	}

	protected getScale(scale: MetricScaleType) {
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

	private parseModel(model: string | IModel): IModel {
		if (typeof model === "string") {
			switch (model) {
				case "HEAD":
					// console.log("baseModel in config: ", this.#head);
					return this.#head;
				case "FACE":
					// console.log("baseModel in config: ", this.#face);
					return this.#face;
				default:
					throw new Error(`ERROR @Polka.mount: ${model} is not a valid model`);
			}
		} else {
			return model;
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

		// console.log(`randomize: ${typeof min} min: ${min} - ${typeof max} max: ${max}`);

		if (typeof min !== "number" || typeof max !== "number") {
			throw new Error(`ERROR @Polka.mount: can't generate random value. Invalid input`);
			// console.log(`WARNING! passing non-numeric parameters to randomize function. min: ${min} - max: ${max}`);
		}

		return genRandomDec(min, max);
	}

	private mount(pool: ModelConfig[], type: string) {
		// Configures the model and its sub-models to fit the Polka context and completes/updates the
		// configuration for next stage, drawing.

		// Picks the first random model from the archetype's catalog and adds it to the queue
		const modelQueue = [pickModel(pool.filter((model) => model.type === type && model.order === "first"))];

		const getBase = (config: ModelConfig) => {
			return config.base === null ? this.#head : this.parseModel(config.base);
		};

		while (modelQueue.length > 0 && modelQueue[0] !== undefined) {
			//
			const config = modelQueue.shift();

			if (!config) {
				throw new Error(`ERROR @ Archetype: failed to retrieve ${type} Model from queue`);
			}
			// ---------------------------------------------------------------------
			// 1: Instantiate the model and set the size to the current Polka

			config.use = config.create(getBase(config), config.type);

			console.log(`.... MOUNTING: `, config.use.name);

			// ---------------------------------------------------------------------
			// 2: Set the structural properties
			config.use.setLevel(config.level);
			config.use.setScale(this.parseMetric(config.size));
			config.use.configure(...config.settings.map((p: any[]) => this.randomize(p)));

			// ---------------------------------------------------------------------
			// 3: Add the updated configuration to be used by drawing
			this.#collection.push(config);

			// ----------------------------------------------------------------------
			// 4: Check if the model containes sub-models to base them on the model 
			// and add them to the queue to be created next.

			if (config.compats.length > 0) {
				// If the model has sub-models they require an attractor. By default it is set to its own base Model's attractor.
				config.use.setAttractor();
				const compatConfig = pickModel(config.compats);
				compatConfig.base = config.use;
				// compatConfig.use = compatConfig.create(config.use, config.type);
				// compatConfig.use.baseOn(config.use);
				// compatConfig.use.setScale(this.parseMetric(config.size));
				// compatConfig.use.configure(...config.settings.map((p: any[]) => this.randomize(p)));

				modelQueue.push(compatConfig);
			}
		}
	}

	public generate(pool: ModelConfig[], layers: string[], params: any) {
		// ...
		const { baseParams, archetypeParams } = params;

		this.clear();

		// ...............................................................................
		// NOTE: head and face need to be plotted at generation time to provide all the models based on them the plots they require

		const eyeMinSize = this.#PHI.XS * PHILESSER;
		const eyeMaxSize = this.#PHI.XS;

		this.#head.configure();
		this.#face.configure(genRandomDec(eyeMinSize, eyeMaxSize), genRandomDec(0.07, 0.12), genRandomDec(0.5, 0.6));

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

		this.#compositions = [];

		for (const modelConfig of this.#collection) {
			if (!modelConfig.use) {
				throw new Error(`ERROR @ Baroque: model config is missing an instance of the model`);
			}

			const comp = modelConfig.use.plot(archetypeParams, ...modelConfig.params);
			this.#compositions.push(comp);
		}

		this.render();
	}

	abstract render(): void;

	public clear() {
		this.#frame.children.forEach((child: any) => child.removeChildren());

		const allOtherLayers = paper.project.layers.filter((l) => l.id !== this.#frame.id);
		allOtherLayers.forEach((layer) => layer.removeChildren());
	}
}

export default Polka;
