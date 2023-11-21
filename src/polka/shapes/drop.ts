import { curve } from "../../lib/topo/tools/stitcher";
import { IAttractor, IAttractorObject } from "../../lib/topo/types";
import Shape from "../core/shape";
import { ShapeProps } from "../types";



class Drop extends Shape {

	static draw(att: IAttractor & IAttractorObject, props: ShapeProps) {

		const { height } = props;

		if ( height === undefined || height === null ) {
			throw new Error(`Error @Drop: height value required`)
		}

		// .............................................
		// Compute parameters

		const h = height;
		const r = att.length/Math.PI/2

		// .............................................
		// Key points



		// .............................................
		// Construction


		// .............................................
		// Configure


		// .............................................
		// Plotting

		const P1 = att.locate(0.75)
		const P2 = att.locate(0)
		const P3 = att.locate(0.25).offsetBy( h-r, 'RAY' ).steer(0, 270 );
		const P4 = att.locate(0.50)

		curve( P2, P3 )
		curve( P3, P4 )

		// .............................................
		// Chart

		// this.C = P3;

		return [ P1, P2, P3, P4 ];
	}

	draw(att: IAttractor & IAttractorObject, props: ShapeProps): any {
		return Drop.draw(att, props)
	}
}

export default Drop;