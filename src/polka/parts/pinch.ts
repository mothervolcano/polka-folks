import { IAttractor, IHyperPoint, PointLike } from "lib/topo/types";
import { convertToHyperPoint } from "lib/topo/utils/converters";

import { PartProps } from "polka/types";
import Orbital from "polka/attractors/orbital";
import OrbitalField from "polka/attractors/orbitalField";
import Part from "polka/core/part";


class Pinch extends Part {
	
	static height: number = 20;

	static configure(props: PartProps) {

		const  { height } = props;
	}

	static draw(att: IAttractor, a: number, b: number, height: number, c?: number) {

		const cuspDist = 40;
		const inletSize = 40;
		const span = 0.10

		// .............................................
		// Key points

		const A = att.locate(a);
		const B = att.locate(b);

		const C = c ? att.locate(c) : att.locate(a+(b-a)/2);

		const field = new OrbitalField( att.center, att.length/Math.PI/2 );
		const attL = new Orbital( [ inletSize * 0.50, inletSize * 1.25 ] );
		const attR = new Orbital( [ inletSize * 0.50, inletSize * 1.25 ] );

		field.addAttractors( [ attL, attR ] );

		field.compress( 0.25 - span, 0.25 + span );
		field.expandBy( inletSize * 0.75 * -1, 'RAY' );

		A.steer( 80 ).scaleHandles(0, true, false );
		C.offsetBy( cuspDist * -1, 'RAY' ).steer(0, 60).scaleHandles(1/5);

		const A1 = attL.locate( 0 ).scaleHandles( 6/3 );
		const B1 = attR.locate( 0 ).scaleHandles( 6/3 ).flip();

		B.steer( -80 ).scaleHandles(0, false, true );


		// ..............................................

		const wrapPath = att.extractPath(a, b);
		wrapPath.reverse();
		const pts = wrapPath.segments.map( (sgm: any) => convertToHyperPoint(sgm) );

		return [ A, A1, C, B1, B, ...pts ];

	}

	configure(props: PartProps) {
		return Pinch.configure(props);
	}

	draw(att: IAttractor, a: number, b: number, height: number, c?: number) {
		return Pinch.draw(att, a, b, height, c);
	}
}

export default Pinch;
