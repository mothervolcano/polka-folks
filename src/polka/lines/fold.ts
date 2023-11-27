import { balance, curve, measure } from "lib/topo/tools/stitcher";
import { IHyperPoint } from "lib/topo/types";
import { genRandomDec } from "lib/topo/utils/helpers";
import Orbital from "polka/attractors/orbital";
import SpinalField from "polka/attractors/spinalField";
import Spine from "polka/attractors/spine";
import Line from "polka/core/line";
import { PHIGREATER, PHILESSER } from "polka/styles/metrics";
import { LineProps } from "polka/types";

class Fold extends Line {
	
	static amplitude: number = 30;

	static configure(props: LineProps) {

		const  { amplitude } = props;
	}

	static draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint): IHyperPoint[] {
		
		// .............................................
		// Compute parameters

		const field = new SpinalField([A.scaleHandles(0),B.scaleHandles(0)], null, "DIRECTED");

		const r = field.length/2;

		// const attL = new Orbital(r/4, [0,0])
		// const attR = new Orbital(r/4, [0,0])
		// const axis = new Spine(r, [0,0])

		// field.addAttractors([attL, axis, attR]);

		field.addAttractor(new Spine(r/2))
		field.addAttractor(new Orbital(r/8))
		field.addAttractor(new Spine(r/2))


		// .............................................
		// Key points


		// .............................................
		// Construction


		// .............................................
		// Configure

		field.compress(0.30, 0.70)
		field.getAttractor(1).moveBy(r/8, 'RAY')
		field.getAttractor(0).rotate(90)
		field.getAttractor(2).rotate(90)

		// .............................................
		// Plotting

		const A1 = field.locateOn(0, 0.50)
		const C1 = field.locateOn(1, 0.75)
		const C2 = field.locateOn(1, 0);
		const C3 = field.locateOn(1, 0.25)
		const B1 = field.locateOn(2, 0.50)

		
		curve(A1, C1)
		// curve(C1, C2)
		curve(C3, B1)

		balance(A1, C1)

		// ............................................................

		return [ A1, C1, C2, C3, B1];
	}

	configure(props: LineProps) {
		return Fold.configure(props);
	}

	draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint): IHyperPoint[] {
		return Fold.draw(A, B, C);
	}
}

export default Fold;
