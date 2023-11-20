import { Path } from "paper";

import Model from "../core/model";
import Orbital from "../attractors/orbital";
import Spine from "../attractors/spine";
import OrbitalField from "../attractors/orbitalField";
import SpinalField from "../attractors/spinalField";

import { markPoint } from "../../lib/topo/utils/helpers";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class Necklace extends Model {
	constructor(field: any, radius: any) {
		super(field, radius);
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

		const A = this.field.getAttractor().locate(a);
		const B = this.field.getAttractor().locate(b);

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

		const paths1 = [
			"L(0)",
			...field1.locate(1).map((P: any) => new Orbital(10, P).path),
		];

		const paths2 = [
			"L(0)",
			...field2.locate(1).map((P: any) => new Orbital(6, P).path),
		];

		const paths3 = [
			"L(0)",
			...field3.locate(1).map((P: any) => new Orbital(5, P).path),
		];

		const paths4 = [
			"L(0)",
			...field4.locate(1).map((P: any) => new Orbital(4, P).path),
		];

		// ..............................................

		// const path = new Path({

		// 	strokeColor: DEBUG_GREEN,
		// 	strokeWidth: 2
		// });

		// this.pen.setPath( path );
		// this.pen.add( [  P, ...pts ] );
		// // this.pen.mirrorRepeat('HOR');

		const instructions = {
			level: 0,
			gradient: null,
		};

		return [instructions, paths1, paths2, paths3, paths4];
	}
}

let instance: Necklace | null = null;

export function drawNecklace(field: any, radius: any): Necklace {
	if (!instance) {
		instance = new Necklace(field, radius);
	}

	return instance;
}