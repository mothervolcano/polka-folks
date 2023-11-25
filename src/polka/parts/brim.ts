import { IAttractor, IHyperPoint, PointLike } from "lib/topo/types";
import { convertToHyperPoint } from "lib/topo/utils/converters";
import Part from "polka/core/part";
import { PartProps } from "polka/types";

class Brim extends Part {
	static height: number = 90;

	static configure(props: PartProps) {
		const { height } = props;

		Brim.height = height || 0;
	}
	
	static draw(att: IAttractor, a: number, b: number, height: number, c?: number) {

		// .............................................
		// Compute parameters

		const dist = Brim.height;

		// .............................................
		// Key points

		const A = att.locate(a);
		const B = att.locate(b);
		// const C = c ? att.locate(c) : att.locate(a+(b-a)/2)

		// .............................................
		// Construction

		// const att = new OrbitalField( this.base.attractor.center, this.base.attractor.radius );

		const A1 = att
			.locate(A.position + 0.075)
			.offsetBy(-15, "RAY")
			.steer(130)
			.scaleHandles(0, true, false)
			.scaleHandles(2/3, false, true);
		const C = att
			.locate((c ? c : a+(b-a)/2))
			.offsetBy(dist * -1, "RAY")
			.scaleHandles(2 / 3);
		const B1 = att
			.locate(B.position - 0.075)
			.offsetBy(-15, "RAY")
			.flip()
			.steer(-130)
			.scaleHandles(0, false, true)
			.scaleHandles(2/3, true, false);
		// B.flip()
		B.scaleHandles(0, false, true)

		const wrapPath = att.extractPath(a, b);
		wrapPath.reverse();

		const pts = wrapPath.segments.map( (sgm: any) => convertToHyperPoint(sgm) );

		return [A, A1, C, B1, B, ...pts ];
	}

	configure(props: PartProps) {
		return Brim.configure(props);
	}

	draw(att: IAttractor, a: number, b: number, height: number, c?: number) {
		return Brim.draw(att, a, b, height, c);
	}
}

export default Brim;
