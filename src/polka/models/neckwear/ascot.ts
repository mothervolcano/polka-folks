import { Path } from "paper";

import { merge, measure, mid, curve } from "lib/topo/tools/stitcher";
import { markPoint, genRandom, genRandomDec } from "lib/topo/utils/helpers";

import { IModel } from "polka/types";
import Model from "polka/core/model";
import Orbital from "polka/attractors/orbital";
import OrbitalField from "polka/attractors/orbitalField";
import Parabole from "polka/parts/parabole";
import AttractorField from "lib/topo/core/attractorField";
import Dimple from "polka/lines/dimple";
import { PHIGREATER, PHILESSER } from "polka/styles/metrics";

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

		const size = this.PHI.BASE;
		const rootSpan = 0.20 * p2Ctrl;

		// .............................................
		// Key points

		// .............................................
		// Configure

		const dimpleSpecs = {
			number: curlNumCtrl,
			height: this.PHI.S,
		};

		const centerPartSpecs = {
			height: this.PHI.XL * heightCtrl,
			amplitude: this.PHI.M,
		};

		const widePartSpecs = {
			height: this.PHI.L * heightCtrl,
			amplitude: this.PHI.S,
		};

		Dimple.configure(dimpleSpecs);

		// .............................................
		// Construction

		const O1 = this.base.attractor.locate(this.#c).offsetBy(this.PHI.M, "RAY");
		const O2 = this.base.attractor.locate(this.#c).offsetBy(this.SIN.M, "RAY");

		const attCenter = new Orbital(this.PHI.M, O1);
		const attWide = new Orbital([this.PHI.BASE, this.SIN.M], O2);

		Parabole.configure(centerPartSpecs);
		const centerPlot = Parabole.draw(attCenter, 0 + rootSpan, 0.50 - rootSpan);
		const centerDimplePlot = Dimple.draw(centerPlot[0], centerPlot[centerPlot.length - 1]);
		centerDimplePlot.reverse();
		centerPlot.shift();
		centerPlot.pop();
		const centerPartPlot = [...centerPlot, ...centerDimplePlot.map((p) => p.flip())];
		curve(centerDimplePlot[centerDimplePlot.length-1], centerPlot[0], 1/3, 2/3);
		curve(centerPlot[centerPlot.length-1], centerDimplePlot[0], 2/3, 1/3);

		Parabole.configure(widePartSpecs);
		const widePlot = Parabole.draw(attWide, 0 + rootSpan*2/3, 0.50 - rootSpan*2/3);
		const wideDimplePlot = Dimple.draw(widePlot[0], widePlot[widePlot.length - 1]);
		wideDimplePlot.reverse();
		widePlot.shift();
		widePlot.pop();
		const widePartPlot = [...widePlot, ...wideDimplePlot.map((p) => p.flip())];
		curve(wideDimplePlot[wideDimplePlot.length-1], widePlot[0], 1/3, 2/3);
		curve(widePlot[widePlot.length-1], wideDimplePlot[0], 2/3, 1/3);

		// .............................................
		// Plotting

		// .............................................
		// Chart

		// ............................................................

		const centerPath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true,
		});

		this.pen.setPath(centerPath);
		this.pen.add(centerPartPlot);
		// this.pen.mirrorRepeat('HOR');

		const widePath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true,
		});

		this.pen.setPath(widePath);
		this.pen.add(widePartPlot);

		const capitalSpecs = {
			level: this.level+1,
			effect: "SOLID",
			scope: "ALL",
		};

		const formaSpecs = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL",
			shade: {
				level: 0,
				effect: "HOLLOW",
				scope: "ALL"
			}
		};

		this.composer.init();
		this.composer.addPath(widePath, formaSpecs);
		this.composer.addCapital(centerPath, capitalSpecs)

		console.log('---> full specs being sent: ', this.composer.wrap())

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
