
import { Point } from "paper";
import { curve, iron } from "../../lib/topo/tools/stitcher";

import { IAttractor, IAttractorObject } from "../../lib/topo/types";
import { normalize, radToDeg } from "../../lib/topo/utils/helpers";
import Shape from "../core/shape";
import { ShapeProps } from "../types";

class Cone extends Shape {
	
	static draw(att: IAttractor & IAttractorObject, props: ShapeProps) {

		const { height } = props;

		if ( height === undefined || height === null ) {
			throw new Error(`Error @Cone: height value required`)
		}

		// .............................................
		// Compute parameters

		const h = height;

		// .............................................
		// Key points



		// .............................................
		// Construction

 		const radius = (att.length/Math.PI)/2;

 		const c = att.center.point;
 		const p = att.locate(0.25).offsetBy( h-radius, 'RAY' ).point;

 		const d = c.getDistance(p);

 		const _a = radToDeg( Math.asin( radius / d ) ); 
 		const a = 180 - 90 - _a;

 		const v = new Point({ angle: a, length: 1 });

 		const t = c.add( v.multiply(radius) );

 		const Ta = att.locate( normalize( 90-a, 0, 360 ) );
 		const Tb = att.locate( normalize( 90+a, 0, 360 ) );

 		// markPoint( Ta );
 		// markPoint( Tb );

		// .............................................
		// Configure


		// .............................................
		// Plotting

		const P0 = att.locate(0.75)
		const P1 = att.locate(0)
		const V = att.locate(0.25).offsetBy( h-radius, 'RAY' );
		const P2 = att.locate(0.50)

		iron(Ta, V)
		iron(V, Tb)

		// curve(P0, Ta, 4/5, 4/5)
		// curve(Tb, P0, 4/5, 4/5)
		curve( P1, Ta )
		curve( Tb, P2 )

		// .............................................
		// Chart

		// this.C = V;

		return [ P0, P1, Ta, V, Tb, P2 ];
	}

	draw(att: IAttractor & IAttractorObject, props: ShapeProps): any {
		return Cone.draw(att, props);
	}
}

export default Cone;
