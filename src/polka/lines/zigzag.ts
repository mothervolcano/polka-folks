import { measure, merge } from "lib/topo/tools/stitcher";
import { IHyperPoint } from "lib/topo/types";
import { genRandomDec } from "lib/topo/utils/helpers";
import Orbital from "polka/attractors/orbital";
import SpinalField from "polka/attractors/spinalField";
import Line from "polka/core/line";
import { LineProps } from "polka/types";

class ZigZag extends Line {

	static num: number = 3;

	static configure(props: LineProps) {

		const { number } = props;

		ZigZag.num = number || 3;
	}

	static draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint) {

		// .............................................
		// Compute parameters

		const distance = measure(A, B);

		const num = ZigZag.num; //genRandom( 2, 10 );
		const roundness = genRandomDec(0.5, 2);
		// const indent = distance/(num+4) * genRandomDec( 0.5, 1.5 );
		const indent = 0;

		// .............................................
		// Key points

		// .............................................
		// Construction

		const field = new SpinalField([A.scaleHandles(0), B.scaleHandles(0)], null, "DIRECTED");

		const r = field.attractor.length / (num * 2);
		const cmpr = 1 / (num * 2);

		for (let i = 0; i < num; i++) {
			field.addAttractor(new Orbital(r));
		}

		// .............................................
		// Configure

		field.compress(0 + cmpr, 1 - cmpr);

		// .............................................
		// Chart

		// .............................................
		// Plotting

		const pts = [];

		const ptsA = field.locate(0.75);
		const ptsB = field.locate(0.25);
		const ptsC = field.locate(0.5);

		for (let i = 0; i < ptsC.length; i++) {
			if (i === 0) {
				// FIRST POINT

				// ptsA[i].offsetBy( indent * -1,'VER').scaleHandles( 1.5 );
				ptsA[i].flip();
				pts.push(ptsA[i]);
			}

			// .......................................

			ptsC[i].flip();
			ptsC[i].scaleHandles(roundness);
			pts.push(ptsC[i]);

			// ......................................

			if (i === ptsC.length - 1) {
				// LAST POINT

				// ptsB[i].offsetBy( indent * -1,'VER').scaleHandles( 1.5 );
				ptsB[i].flip();
				pts.push(ptsB[i]);
			} else {
				if (i < ptsC.length - 1) {
					const pt = merge(ptsB[i].flip(), ptsA[i + 1].flip());

					// pt.offsetBy( indent * -1, 'VER').steer(-90, 0);
					pts.push(pt);
				}
			}
		}

		return pts;
	}

	configure(props: LineProps) {
		return ZigZag.configure(props);
	}

	draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint) {
		return ZigZag.draw(A, B, C);
	}
}

export default ZigZag;
