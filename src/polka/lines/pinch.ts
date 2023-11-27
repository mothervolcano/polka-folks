import { curve } from "lib/topo/tools/stitcher";
import { IHyperPoint } from "lib/topo/types";
import Orbital from "polka/attractors/orbital";
import SpinalField from "polka/attractors/spinalField";
import Spine from "polka/attractors/spine";
import Line from "polka/core/line";
import { LineProps } from "polka/types";

class Pinch extends Line {
	
	static amplitude: number = 30;

	static configure(props: LineProps) {

		const  { amplitude } = props;

		Pinch.amplitude = amplitude ? amplitude : Pinch.amplitude;
	}

	static draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint): IHyperPoint[] {
		
		// .............................................
		// Compute parameters

		// .............................................
		// Construction

		const field = new SpinalField([A.scaleHandles(0), B.scaleHandles(0)], null, "DIRECTED");

		const r = field.length/4;

		field.addAttractor(new Spine(r))
		field.addAttractor(new Spine(r))
		field.addAttractor(new Spine(r))


		// ............................................
		// Modification

		field.getAttractor(0).rotate(120)
		field.getAttractor(2).rotate(-120)

		// .............................................
		// Key points

		const A1 = field.locateOn(0, 0.5);
		const C1 = field.locateOn(1, 1).steer(90, 180+120);
		const B1 = field.locateOn(2, 0.5).flip();

		return [A1, C1, B1];
	}

	configure(props: LineProps) {
		return Pinch.configure(props);
	}

	draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint): IHyperPoint[] {
		return Pinch.draw(A, B, C);
	}
}

export default Pinch;
