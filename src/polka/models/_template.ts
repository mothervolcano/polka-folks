import { Path } from "paper";

import { merge, measure, mid, curve } from "lib/topo/tools/stitcher";
import { markPoint, genRandom, genRandomDec } from "lib/topo/utils/helpers";

import { IModel } from "polka/types";
import Model from "polka/core/model";
import Orbital from "polka/attractors/orbital";
import OrbitalField from "polka/attractors/orbitalField";


const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class NewModel extends Model {
	// ...
	constructor(base: IModel, type?: string) {
		super(base, type);

		return this;
	}

	public configure() {
	}

	public plot(params: any) {
		// .............................................
		// Compute parameters

		// .............................................
		// Key points

		// .............................................
		// Construction

		// .............................................
		// Configure

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
		this.pen.add([]);
		// this.pen.mirrorRepeat('HOR');

		const formaSpecs = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(path, formaSpecs);

		return this.composer.wrap();
	}
}

let instance: IModel | null = null;

export function drawNewModel(base: IModel,  type?: string): IModel {
	if (!instance) {
		instance = new NewModel(base, type) as IModel;
	}

	return instance;
}
