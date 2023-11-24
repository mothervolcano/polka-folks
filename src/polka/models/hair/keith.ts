import { Path } from "paper";

import { merge, measure, mid, curve } from "lib/topo/tools/stitcher";
import { markPoint, genRandom, genRandomDec, isEven } from "lib/topo/utils/helpers";

import { IModel } from "polka/types";
import Model from "polka/core/model";
import Orbital from "polka/attractors/orbital";
import OrbitalField from "polka/attractors/orbitalField";

import { PHIGREATER } from "polka/styles/metrics";

import Cone from "polka/shapes/cone";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class Keith extends Model {
	// ...
	constructor(base: IModel, type?: string) {
		super(base, type);

		this.name = "keith";

		return this;
	}

	public configure() {}

	public plot(params: any) {
		// ...
		const { spikeNumCtrl, spikeRadiusCtrl, spikeLengthCtrl, spikeSpreadCtrl, shrinkRateCtrl, spikeSharpnessCtrl, p7 } = params;

		// .............................................
		// Compute parameters

		const spikeNum = spikeNumCtrl;

		let thickness = 0.04; // * p5
		let indent = 1;

		const decayRate = shrinkRateCtrl;
		const compression = 0.25*spikeSpreadCtrl;
		const step = (0.25-compression) / spikeNum;
		let decay = 0;
		const radius = this.PHI.XS * spikeRadiusCtrl;
		const length = radius * 4;
		const angle = 120*p7-60;


		const lengthFn = (value: number) => {
			return Math.max(value, radius*2);
		}

		// .............................................
		// Key points

		// .............................................
		// Construction

		const plots: any[] = [];

		const field = new OrbitalField(this.base.attractor.center, this.SIN.BASE);

		// -------------
		// Center Spike

		const attC = new Orbital(radius*PHIGREATER);
		attC.anchorAt(field.attractor.locate(0.25));
		attC.rotate(90)

		const centerShapeProps = {
				height: lengthFn(length * PHIGREATER * Math.max(spikeLengthCtrl - decay, 0)),
			};
		plots.push(Cone.draw(attC, centerShapeProps));

		// --------------
		// Lateral Spikes

		for (let i = 1; i < spikeNum; i++) {
			decay += decayRate;

			// if (isEven(i)) {
			// 	indent = Math.min(i * (1 / 3), 1);
			// 	indent -= (1 / spikeNum) * i;
			// } else {
			// 	// decay += decayRate;
			// 	indent = 0;
			// }

			thickness -= (1 / i) * 0.0075;

			const attL = new Orbital(radius);
			attL.anchorAt(field.attractor.locate(0.25 - step * i));
			attL.rotate(90-angle)

			const attR = new Orbital(radius);
			attR.anchorAt(field.attractor.locate(0.25 + step * i));
			attR.rotate(90+angle)

			const shapeProps = {
				height: lengthFn(length * Math.max(spikeLengthCtrl - decay, 0))
			};

			plots.push(Cone.draw(attL, shapeProps));
			plots.push(Cone.draw(attR, shapeProps));

			attL.remove()
			attR.remove()
		}

		// .............................................
		// Configure

		// .............................................
		// Plotting

		const drawSpike = (plot: any[]) => {
			const path = new Path({
				strokeColor: DEBUG_GREEN,
				strokeWidth: 0,
				closed: true,
			});

			this.pen.setPath(path);
			this.pen.add(plot);

			return path;
		};

		// .............................................
		// Chart

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL",
		};

		this.composer.init();

		this.composer.addPaths(
			plots.map((p) => drawSpike(p)),
			formaProps,
		);

		return this.composer.wrap();
	}
}

let instance: IModel | null = null;

export function drawKeith(base: IModel, type?: string): IModel {
	if (!instance) {
		instance = new Keith(base, type) as IModel;
	}

	return instance;
}
