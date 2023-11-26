import { IAttractor, IHyperPoint } from "lib/topo/types";
import { convertToHyperPoint } from "lib/topo/utils/converters";

import { PartProps } from "polka/types";
import Part from "polka/core/part";


class Stripe extends Part {
	
	static height: number = 0.1;
	static bottomCurve: boolean = false;

	static configure(props: PartProps) {

		const  { height, alt1 } = props;

		Stripe.height = height || 0.1;
		Stripe.bottomCurve = alt1 || false;
	}

	static draw(att: IAttractor, a: number, b: number, c?: number): IHyperPoint[] {

		// .............................................
		// Compute parameters

		const h = Stripe.height;

		// .............................................
		// Key points

		const A = att.locate(a).scaleHandles(0, !Stripe.bottomCurve, true)
		const B = att.locate(b).scaleHandles(0, true, !Stripe.bottomCurve)
		const A1 = att.locate(a+h).scaleHandles(0)
		const B1 = att.locate(b-h).scaleHandles(0)
		const C = c ? att.locate(c) : att.locate(a+(b-a)/2);

		// ..............................................

		const leftWrap = att.extractPath(a, a+h);
		// leftWrap.reverse();
		const leftWrapPlot = leftWrap.segments.map( (sgm: any) => convertToHyperPoint(sgm) );		

		const rightWrap = att.extractPath(b-h, b);
		// rightWrap.reverse();
		const rightWrapPlot = rightWrap.segments.map( (sgm: any) => convertToHyperPoint(sgm) );

		// return [ A1, ...leftWrapPlot, A, B1, ...rightWrapPlot, B];
		return [ A, ...leftWrapPlot, A1, B1, ...rightWrapPlot, B];

	}

	configure(props: PartProps) {
		return Stripe.configure(props);
	}

	draw(att: IAttractor, a: number, b: number, c?: number): IHyperPoint[]{
		return Stripe.draw(att, a, b, c);
	}
}

export default Stripe;
