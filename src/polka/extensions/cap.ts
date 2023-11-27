import { IAttractor, IHyperPoint, PointLike } from "lib/topo/types";
import { convertToHyperPoint } from "lib/topo/utils/converters";

import { PartProps } from "polka/types";
import Orbital from "polka/attractors/orbital";
import OrbitalField from "polka/attractors/orbitalField";
import Part from "polka/core/part";
import Extension from "polka/core/extension";
import { curve, iron } from "lib/topo/tools/stitcher";



class Cap extends Extension {
	
	static span: number = 0.1;
	static height: number = 25;
	static heightDiff: number = 1;

	static configure(props: PartProps) {

		const  { span, height, diff } = props;

		Cap.span = span ? span : Cap.span;
		Cap.height = height ? height : Cap.height;
		Cap.heightDiff = diff ? diff - 0.5 : Cap.heightDiff;
	}

	static draw(att: IAttractor, a: number, b: number, c?: number): IHyperPoint[] {

		// .............................................
		// Key points

		const A = att.locate(a).offsetBy(Cap.height*(1+Cap.heightDiff), "RAY").steer(-30);
		const B = att.locate(b).offsetBy(Cap.height*(1+Cap.heightDiff), "RAY").steer(30);

		const A1 = att.locate(a+Cap.span).offsetBy(Cap.height*(1-Cap.heightDiff), "RAY");;
		const B1 = att.locate(b-Cap.span).offsetBy(Cap.height*(1-Cap.heightDiff), "RAY");;

		const C = c ? att.locate(c) : att.locate(a+(b-a)/2);

		iron(A1, B1);

		return [A, A1, B1, B ];

	}

	configure(props: PartProps) {
		return Cap.configure(props);
	}

	draw(att: IAttractor, a: number, b: number, c?: number): IHyperPoint[] {
		return Cap.draw(att, a, b, c);
	}
}

export default Cap;
