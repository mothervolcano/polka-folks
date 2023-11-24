import { Path, CompoundPath } from "paper";

import Model from "../core/model";
import Orbital from "../attractors/orbital";
import OrbitalField from "../attractors/orbitalField";

import Lozenge from "../shapes/lozenge";
import Drop from "../shapes/drop";
import Cone from "../shapes/cone";

import { merge, measure, mid, curve } from "../../lib/topo/tools/stitcher";

import { markPoint, genRandom, genRandomDec } from "../../lib/topo/utils/helpers";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class EarModelTest extends Model {
	#shapes: any;

	constructor(field: any, type?: string) {
		super(field, type);

		this.name = "earring model test";

		// this._shapes = [ useLozenge, useDrop ];
		this.#shapes = [Lozenge, Drop, Cone];

		return this;
	}

	private pickShape() {
		return this.#shapes[genRandom(0, this.#shapes.length - 1)];
	}

	public configure() {
		
	}

	public plot(params: any, ATT: string, c: number) {
		// .............................................
		// Compute parameters

		const baseSize = this.PHI.BASE * this.SIN36;
		const num = 3;

		// .............................................
		// Key points

		let O = this.base.getAtt(ATT).locate(0.75);

		// .............................................
		// Construction

		const plots = [];

		for (let i = 0; i < num; i++) {
			const size = baseSize * genRandomDec(0.25, 0.75);
			const h = size*2;
			const att = new Orbital(size, O);
			att.anchorAt(O);
			att.moveBy(h, "VER");

			O = att.locate(0.5);

			att.rotate(-90);

			const Shape = this.pickShape();

			plots.push(Shape.draw(att, { height: h }));

			// adjust positioning of the attractor based on the resulting plot
		}

		// .............................................
		// Configure

		// .............................................
		// Plotting

		// ............................................................

		const formaProps = {
			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();

		const paths = plots.map((plot) => {
			const _path = new Path({
				strokeColor: DEBUG_GREEN,
				strokeWidth: 1,
				closed: true,
			});

			this.pen.setPath(_path);
			this.pen.add(plot);

			this.composer.addPath(_path, formaProps);

		});


		// .............................................
		// Chart

		// .............................................
		
		return this.composer.wrap();

	}
}

let instance: EarModelTest | null = null;

export function drawEarModelTest(field: any, type?: string): EarModelTest {
	if (!instance) {
		instance = new EarModelTest(field, type);
	}

	return instance;
}
