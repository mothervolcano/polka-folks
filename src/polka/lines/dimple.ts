import { curve } from "lib/topo/tools/stitcher";
import { IHyperPoint } from "lib/topo/types";
import Orbital from "polka/attractors/orbital";
import SpinalField from "polka/attractors/spinalField";
import Line from "polka/core/line";
import { LineProps } from "polka/types";

class Dimple extends Line {
	
	static amplitude: number = 30;

	static configure(props: LineProps) {

		const  { amplitude } = props;

		Dimple.amplitude = amplitude ? amplitude : Dimple.amplitude;
	}

	static draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint): IHyperPoint[] {
		
		// .............................................
		// Compute parameters


		// .............................................
		// Construction

		const field = new SpinalField([A.scaleHandles(0), B.scaleHandles(0)], null, "DIRECTED");

		const r = field.length/3/2;
		const cornerFactor = 2/3;

		const attL = new Orbital(r*cornerFactor);
		const attC = new Orbital(r*2);
		const attR = new Orbital(r*cornerFactor);

		field.addAttractors([attL, attC, attR]);


		// ............................................
		// Modification

		field.compress(cornerFactor/3, 1-cornerFactor/3);
		field.expandBy(-r/9, "RAY")
		attC.moveBy(r*9/5, 'RAY')

		// .............................................
		// Key points

		const A1 = field.locateOn(0, 0.55).flip();
		const C1 = field.locateOn(1, 0.50).flip();
		const B1 = field.locateOn(2, 0.45).flip();

		curve(A1, C1, 2/3, 1/3)
		curve(C1, B1, 1/3, 2/3)

		return [A1, C1, B1];

		// const pts = field.locate(0.50);

		// return [...pts.map( p => p.flip() )];
	}

	configure(props: LineProps) {
		return Dimple.configure(props);
	}

	draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint): IHyperPoint[] {
		return Dimple.draw(A, B, C);
	}
}

export default Dimple;
