import { IAttractor } from "lib/topo/types";
import { convertToHyperPoint } from "lib/topo/utils/converters";

import { PartProps } from "polka/types";
import Part from "polka/core/part";


class Onda extends Part {
	
	static height: number = 40;

	static configure(props: PartProps) {

		const  { height } = props;
	}

	static draw(att: IAttractor, a: number, b: number, height: number, c?: number) {

		// .............................................
		// Compute parameters

		const advance = Onda.height;

		const arc = (b-a)*5;

		// .............................................
		// Key points

		const A = att.locate(a).scaleHandles(0, true, false).scaleHandles(arc, false, true).steer(15);
		const B = att.locate(b).scaleHandles(arc, true, false).steer(-15);;
		const C = c ? att.locate(c) : att.locate(a+(b-a)/2);
		
		C.offsetBy( advance * -1, 'RAY' );

		// ..............................................

		const wrapPath = att.extractPath(a, b);
		wrapPath.reverse();
		const pts = wrapPath.segments.map( (sgm: any) => convertToHyperPoint(sgm) );

		return [ A, C, B, ...pts ];

	}

	configure(props: PartProps) {
		return Onda.configure(props);
	}

	draw(att: IAttractor, a: number, b: number, height: number, c?: number) {
		return Onda.draw(att, a, b, height, c);
	}
}

export default Onda;
