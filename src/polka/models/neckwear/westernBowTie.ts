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
import Stripe from "polka/parts/stripe";
import Spine from "polka/attractors/spine";
import SpinalField from "polka/attractors/spinalField";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class WesternBowTie extends Model {
	// ...
	#c: number = 0;

	constructor(base: IModel, type?: string) {
		super(base, type);

		this.name = "WesternBowTie";

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

		const basePartSpecs = {
			height: 0.05,
			alt1: true,
			amplitude: this.PHI.S,
		};

		const centerPartSpecs = {
			height: this.PHI.XL * heightCtrl,
			amplitude: this.PHI.M,
		};

		const lacePartSpecs = {

			height: 0.025,
		}


		// .............................................
		// Construction

		const O1 = this.base.attractor.locate(this.#c);
		const O2 = this.base.attractor.locate(this.#c);

		const attBase = new Orbital(this.PHI.BASE, O1);

		const laceField = new OrbitalField(O2, this.PHI.L);

		const fieldL = new SpinalField(O2, this.PHI.XL) as any;
		const fieldR = new SpinalField(O2, this.PHI.XL) as any;

		laceField.addAttractors([fieldL, fieldR]);

		laceField.compress(0.80, 0.70);
		laceField.expandBy(this.PHI.XL/2, "RAY");

		fieldL.addAttractor(new Spine(this.PHI.M))
		fieldL.addAttractor(new Spine(this.PHI.M))		

		fieldR.addAttractor(new Spine(this.PHI.M))
		fieldR.addAttractor(new Spine(this.PHI.M))


		Stripe.configure(basePartSpecs);
		const basePlot = Stripe.draw(attBase, 1-basePartSpecs.height, 0.50+basePartSpecs.height);


		// .............................................
		// Plotting

		const lLacePlot = [ ...fieldL.locate(1).reverse().map( (p:any) => p.scaleHandles(0)), ...fieldL.locate(0).map( (p:any) => p.scaleHandles(0)) ]
		const rLacePlot = [ ...fieldR.locate(1).reverse().map( (p:any) => p.scaleHandles(0)), ...fieldR.locate(0).map( (p:any) => p.scaleHandles(0)) ]

		// .............................................
		// Chart

		// ............................................................

		const basePath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true,
		});

		this.pen.setPath(basePath);
		this.pen.add(basePlot);

		const lLacePath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true,
		});

		this.pen.setPath(lLacePath);
		this.pen.add(lLacePlot);

		const rLacePath = new Path({
			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true,
		});

		this.pen.setPath(rLacePath);
		this.pen.add(rLacePlot);

		const capitalSpecs = {
			level: this.level-1,
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
		this.composer.addPath(basePath, formaSpecs);
		this.composer.addPath(lLacePath, formaSpecs);
		this.composer.addPath(rLacePath, formaSpecs);

		return this.composer.wrap();
	}
}

let instance: IModel | null = null;

export function drawWesternBowTie(base: IModel, type?: string): IModel {
	if (!instance) {
		instance = new WesternBowTie(base, type) as IModel;
	}

	return instance;
}
