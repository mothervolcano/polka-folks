import { IHyperPoint } from "lib/topo/types";
import Line from "polka/core/line";
import { LineProps } from "polka/types";

class Cape extends Line {
	
	static amplitude: number = 0;

	static configure(props: LineProps) {

		const  { amplitude } = props;
	}

	static draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint) {
		
		// .............................................
		// Compute parameters

		const length = Cape.amplitude;

		// .............................................
		// Key points

		const A1 = A.clone();
		const B1 = B.clone();
		const A2 = A.clone().offsetBy(length, "VER");
		const B2 = B.clone().offsetBy(length, "VER");

		A1.scaleHandles(0);
		B1.scaleHandles(0);
		B2.scaleHandles(0);
		A2.scaleHandles(0);

		return [ A1, A2, B2, B1 ];
	}

	configure(props: LineProps) {
		return Cape.configure(props);
	}

	draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint) {
		return Cape.draw(A, B, C);
	}
}

export default Cape;
