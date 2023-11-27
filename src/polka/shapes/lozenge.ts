import { level } from "../../lib/topo/tools/stitcher";
import { IAttractor, IAttractorObject } from "../../lib/topo/types";
import Shape from "../core/shape";
import { ShapeProps } from "../types";



class Lozenge extends Shape {

	static draw(att: IAttractor & IAttractorObject, props: ShapeProps) {

		const { height } = props;

		if ( height === undefined || height === null ) {
			throw new Error(`Error @Lozenge: height value required`)
		}

		// .............................................
		// Compute parameters

		const h = height || 0;
		const r = att.length/Math.PI/2;

		// .............................................
		// Key points



		// .............................................
		// Construction


		// .............................................
		// Configure


		// .............................................
		// Plotting

		const P1 = att.locate(0)
		const P2 = att.locate(0.25).offsetBy( h-r, 'RAY' ); // height is measured from the center
		const P3 = att.locate(0.50)
		const P4 = att.locate(0.75)

		level( P1, P2 )
		level( P2, P3 )
		level( P3, P4 )
		level( P4, P1 )

		return [ P1, P2, P3, P4 ];
	}

	draw(att: IAttractor & IAttractorObject, props: ShapeProps): any {
		return Lozenge.draw(att, props)
	}
}

export default Lozenge;