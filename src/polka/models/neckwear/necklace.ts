import { Path } from "paper";

import { markPoint } from "lib/topo/utils/helpers";

import { IModel } from "polka/types";
import Model from "polka/core/model";
import Orbital from "polka/attractors/orbital";
import Spine from "polka/attractors/spine";
import SpinalField from "polka/attractors/spinalField";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class Necklace extends Model {
	// ...
	constructor(base: IModel, type?: any) {
		super(base, type);

		this.name = "necklace";
	}

	public configure() {}

	public plot(params: any, a: number, b: number) {
		const {} = params;

		// ..........................................................
		// set the parameters

		const num = 5;
		const distance = 30;
		let compression;

		// ..........................................................
		// determine the key points

		const A = this.base.attractor.locate(a);
		const B = this.base.attractor.locate(b);

		// ..........................................................
		// build the fields

		const field1 = new SpinalField([A, B], null, "DIRECTED");

		field1.addAttractor(new Spine(distance));
		field1.addAttractor(new Spine(distance));
		field1.addAttractor(new Spine(distance));
		field1.addAttractor(new Spine(distance));
		field1.addAttractor(new Spine(distance));

		// ..................................

		const field2 = new SpinalField([A, B], null, "DIRECTED");

		field2.addAttractor(new Spine(distance * 2));
		field2.addAttractor(new Spine(distance * 2));
		field2.addAttractor(new Spine(distance * 2));
		field2.addAttractor(new Spine(distance * 2));

		// ..................................

		const field3 = new SpinalField([A, B], null, "DIRECTED");

		field3.addAttractor(new Spine(distance * 3));
		field3.addAttractor(new Spine(distance * 3));
		field3.addAttractor(new Spine(distance * 3));

		// ..................................

		const field4 = new SpinalField([A, B], null, "DIRECTED");

		field4.addAttractor(new Spine(distance * 4));
		field4.addAttractor(new Spine(distance * 4));

		// ..........................................................
		// transform the fields

		compression = 1 / (field1.length / (num * 3));
		field2.compress(compression, 1 - compression);

		compression = 1 / (field1.length / (num * 6));
		field3.compress(compression, 1 - compression);

		compression = 1 / (field1.length / (num * 9));
		field4.compress(compression, 1 - compression);

		// ..........................................................
		// plot the points for drawing

		const paths1 = field1.locate(1).map((P: any) => new Orbital(10, P).getPath())

		const paths2 = field2.locate(1).map((P: any) => new Orbital(6, P).getPath())

		const paths3 = field3.locate(1).map((P: any) => new Orbital(5, P).getPath())

		const paths4 = field4.locate(1).map((P: any) => new Orbital(4, P).getPath())

		// ..............................................

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		console.log(`!!! level @${this.name}: `, this.level)

		this.composer.init();

		this.composer.addPaths(paths1, formaProps)
		this.composer.addPaths(paths2, formaProps)
		this.composer.addPaths(paths3, formaProps)
		this.composer.addPaths(paths4, formaProps)
		
		// ..............................................

		field1.remove();
		field2.remove();
		field3.remove();
		field4.remove();


		return this.composer.wrap();
		
	}
}

let instance: IModel | null = null;

export function drawNecklace(base: IModel, type?: any): IModel {
	if (!instance) {
		instance = new Necklace(base, type) as IModel;
	}

	return instance;
}
