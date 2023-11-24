import { Path } from "paper";

import { merge, measure, mid, curve } from "lib/topo/tools/stitcher";
import { markPoint, genRandom, genRandomDec, isEven } from "lib/topo/utils/helpers";

import { IModel } from "polka/types";
import Model from "polka/core/model";
import Orbital from "polka/attractors/orbital";
import OrbitalField from "polka/attractors/orbitalField";

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
		const { spikeNumCtrl, spikeLengthCtrl, spikeSpreadCtrl, shrinkRateCtrl, spikeSharpnessCtrl } = params;

		// .............................................
		// Compute parameters

		const spikeNum = 3;

		let thickness = 0.04; // * p5
		let indent = 1;

		const compression = 0.25 * spikeSpreadCtrl;
		const decayRate = shrinkRateCtrl;
		const step = (0.5 - compression) / spikeNumCtrl;
		let decay = 0;
		let length;

		// .............................................
		// Key points

		// .............................................
		// Construction

		const plots: any[] = [];

		const field = new OrbitalField(this.base.attractor.center, this.SIN.BASE);

		const attC = new Orbital(this.PHI.XS);
		attC.anchorAt(field.attractor.locate(0.25));
		attC.rotate(90)

		const centerShapeProps = {
				height: 50,
			};
		plots.push(Cone.draw(attC, centerShapeProps));

		for (let i = 1; i < spikeNum; i++) {
			decay += decayRate;

			if (isEven(i)) {
				indent = Math.min(i * (1 / 3), 1);
				indent -= (1 / spikeNum) * i;
			} else {
				// decay += decayRate;
				indent = 0;
			}

			length = Math.max(spikeLengthCtrl - decay, 0);
			thickness -= (1 / i) * 0.0075;

			const attL = new Orbital(this.PHI.XS);
			attL.anchorAt(field.attractor.locate(0.25 - step * i));
			attL.rotate(90-30)

			const attR = new Orbital(this.PHI.XS);
			attR.anchorAt(field.attractor.locate(0.25 + step * i));
			attR.rotate(90+30)

			const shapeProps = {
				height: 50 * length,
			};

			plots.push(Cone.draw(attL, shapeProps));
			plots.push(Cone.draw(attR, shapeProps));
		}

		// .............................................
		// Configure

		// .............................................
		// Plotting

		const drawSpike = (plot: any[]) => {
			const path = new Path({
				strokeColor: DEBUG_GREEN,
				strokeWidth: 1,
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
