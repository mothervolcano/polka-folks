import { budge, curve, lock, tie } from "lib/topo/tools/stitcher";
import { IAttractor, IHyperPoint, PointLike } from "lib/topo/types";
import { convertToHyperPoint } from "lib/topo/utils/converters";
import Part from "polka/core/part";
import { PartProps } from "polka/types";

class Parabole extends Part {
	static height: number = 50;
	static amplitude: number = 50;

	static configure(specs: PartProps) {
		const { height, amplitude } = specs;

		Parabole.height = height || 50;
		Parabole.amplitude = amplitude || 50; 
	}

	static draw(att: IAttractor, a: number, b: number, c?: number): IHyperPoint[] {
		// .............................................
		// Compute parameters

		// ...........................................
		// calculate params

		// ...........................................
		// determine keypoints

		const A = att.locate(a);
		const B = att.locate(b);
		const C = c ? att.locate(c) : att.locate(a + (b - a) / 2);

		// ..........................................

		// A.steer(-25)
		const A0 = A.clone();
		A0.steer(-Parabole.amplitude).offsetBy(-Parabole.height, 'TAN');
		A0.scaleHandles(0);

		// B.steer(25)
		const B1 = B.clone();
		B1.steer(Parabole.amplitude).offsetBy(Parabole.height, 'TAN');
		B1.scaleHandles(0);

		const wrapPath = att.extractPath(a, b);
		const pts = wrapPath.segments.map((sgm: any) => convertToHyperPoint(sgm));

		// curve(A0, pts[0], 1, 1/3)
		// curve(pts[pts.length-1], B1, 1/3, 1)

		return [A0, ...pts, B1];
	}

	configure(props: PartProps) {
		return Parabole.configure(props);
	}

	draw(att: IAttractor, a: number, b: number, c?: number): IHyperPoint[] {
		return Parabole.draw(att, a, b, c);
	}
}

export default Parabole;
