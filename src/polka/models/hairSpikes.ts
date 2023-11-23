import { Path } from "paper";

import Model from "../core/model";
import Orbital from "../attractors/orbital";
import OrbitalField from "../attractors/orbitalField";

import Cone from "../shapes/cone";

import { merge, measure, mid, curve } from "../../lib/topo/tools/stitcher";

import { markPoint, genRandom, genRandomDec } from "../../lib/topo/utils/helpers";
import { IModel } from "../types";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class HairSpikes extends Model {
	// ...
	constructor(base: IModel, type?: string) {
		super(base, type);

		return this;
	}

	public configure() {
		this.level = 2;
	}

	public plot(params: any, lvl: number) {
		// ...
		const { spikeNumCtrl, spikeLengthCtrl, spikeSpreadCtrl, shrinkRateCtrl, spikeSharpnessCtrl } = params;

		let spikePlot;

		// .............................................
		// Compute parameters

		let thickness = 0.04; // * p5
		let indent = 1;

		const compression = 0.25 * spikeSpreadCtrl;
		const decayRate = shrinkRateCtrl;
		const step = (0.25 - compression) / spikeNumCtrl;
		let decay = 0;
		let length;

		// .............................................
		// Key points

		// .............................................
		// Construction

		// spikePlot = model.plot(
		// 	0.25, // C
		// 	0.25 - thickness, // A
		// 	0.25 + thickness, // B
		// 	spikeLengthCtrl,
		// 	spikeSharpnessCtrl,
		// 	indent,
		// );

		// for (let i = 1; i < spikeNumCtrl; i++) {
		// 	decay += decayRate;

		// 	if (isEven(i)) {
		// 		indent = Math.min(i * (1 / 3), 1);
		// 		indent -= (1 / spikeNumCtrl) * i;
		// 	} else {
		// 		// decay += decayRate;
		// 		indent = 0;
		// 	}

		// 	length = Math.max(spikeLengthCtrl - decay, 0);

		// 	thickness -= (1 / i) * 0.0075;

		// 	// LEFT SIDE

		// 	spikePlot = model.plot(
		// 		0.25 - step * i, // C
		// 		0.25 - step * i - thickness, // A
		// 		0.25 - step * i + thickness, // B
		// 		length,
		// 		spikeSharpnessCtrl,
		// 		indent,
		// 	);

		// 	this.plotter.chart(spikePlot, "spike");

		// 	// RIGHT SIDE

		// 	spikePlot = model.plot(
		// 		0.25 + step * i, // C
		// 		0.25 + step * i - thickness, // A
		// 		0.25 + step * i + thickness, // B
		// 		length,
		// 		spikeSharpnessCtrl,
		// 		indent,
		// 	);

		// 	this.plotter.chart(spikePlot, "spike");
		// }

		// .............................................
		// Configure

		// .............................................
		// Plotting

		// ............................................................

		this.path = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true,
		});

		this.pen.setPath(this.path);
		this.pen.add([]);
		// this.pen.mirrorRepeat('HOR');

		const instructions = {
			level: this.level,
			complete: true,
			gradient: null,
		};

		// .............................................
		// Chart

	}
}

let instance: IModel | null = null;

export function drawNewModel(base: IModel, type?: string): IModel {
	if (!instance) {
		instance = new HairSpikes(base, type) as IModel;
	}

	return instance;
}
