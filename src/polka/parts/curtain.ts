import { IAttractor, IHyperPoint, PointLike } from "lib/topo/types";
import { convertToHyperPoint } from "lib/topo/utils/converters";
import Part from "polka/core/part";
import { PartProps } from "polka/types";


class Curtain extends Part {
	
	static height: number = 20;

	static configure(props: PartProps) {

		const  { height } = props;
	}

	static draw(att: IAttractor, a: number, b: number, height: number, c?: number) {
		
		// .............................................
		// Compute parameters

		const splitStart = Curtain.height;
		const aperture = 290;

		// ...........................................
		// calculate params



		// ...........................................
		// determine keypoints
		
		const A = att.locate(a)
		const B = att.locate(b)
		const C = c ? att.locate(c) : att.locate(a+(b-a)/2)

		C.offsetBy( splitStart, 'VER' ).steer(0, aperture);

		// ..........................................

		const wrapPath = att.extractPath(a, b);

		const pts = wrapPath.segments.map( (sgm: any) => convertToHyperPoint(sgm) );

		return [A, ...pts, B, C.flip()];
	}

	configure(props: PartProps) {
		return Curtain.configure(props);
	}

	draw(att: IAttractor, a: number, b: number, height: number, c?: number) {
		return Curtain.draw(att, a, b, height, c);
	}
}

export default Curtain;
