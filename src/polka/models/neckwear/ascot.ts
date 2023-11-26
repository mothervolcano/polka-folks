import { Path } from "paper";

import { merge, measure, mid, curve } from "lib/topo/tools/stitcher";
import { markPoint, genRandom, genRandomDec } from "lib/topo/utils/helpers";

import { IModel } from "polka/types";
import Model from "polka/core/model";
import Orbital from "polka/attractors/orbital";
import OrbitalField from "polka/attractors/orbitalField";
import Parabole from "polka/parts/parabole";
import AttractorField from "lib/topo/core/attractorField";
import ZigZag from "polka/lines/zigzag";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class Ascot extends Model {
	// ...
	#c: number = 0;

	constructor(base: IModel, type?: string) {
		super(base, type);

		this.name = "Ascot";

		return this;
	}

	public configure(c: number) {
		this.#c = c;
	}

	public plot(params: any) {
		// .............................................
		// Compute parameters

		const { curlNumCtrl, p2Ctrl, heightCtrl } = params;

		const knotSpan = 0.20 * p2Ctrl;

		console.log('@Ascot.params: ', p2Ctrl)

		// .............................................
		// Key points

		// .............................................
		// Configure

		const zigZagSpecs = {
			number: curlNumCtrl,
			height: this.PHI.S,
		};

		const mainPartSpecs = {
			height: this.PHI.XL * heightCtrl,
			amplitude: this.PHI.M,
		};

		Parabole.configure(mainPartSpecs);
		ZigZag.configure(zigZagSpecs);

		// .............................................
		// Construction

		const O = this.base.attractor.locate(this.#c).offsetBy(this.PHI.L, "RAY");

		const field = new OrbitalField(O, this.PHI.M);
		const att = new Orbital(this.PHI.L, O);

		const mainPlot = Parabole.draw(att, 0 + knotSpan, 0.50 - knotSpan);
		const patternPlot = ZigZag.draw(mainPlot[0], mainPlot[mainPlot.length - 1]);
		const plot = [...mainPlot, ...patternPlot.reverse().map((p) => p.flip())];

		// .............................................
		// Plotting

		// .............................................
		// Chart

		// ............................................................

		const path = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true,
		});

		this.pen.setPath(path);
		this.pen.add(plot);
		// this.pen.mirrorRepeat('HOR');

		const formaSpecs = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL",
		};

		// path.fullySelected = true;

		this.composer.init();
		this.composer.addPath(path, formaSpecs);

		return this.composer.wrap();
	}
}

let instance: IModel | null = null;

export function drawAscot(base: IModel, type?: string): IModel {
	if (!instance) {
		instance = new Ascot(base, type) as IModel;
	}

	return instance;
}
