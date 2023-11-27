import { IAttractor, IHyperPoint, PointLike } from "lib/topo/types";
import { convertToHyperPoint } from "lib/topo/utils/converters";

import { PartProps } from "polka/types";
import Orbital from "polka/attractors/orbital";
import OrbitalField from "polka/attractors/orbitalField";
import Part from "polka/core/part";
import Extension from "polka/core/extension";
import { clap, curve, iron, level, mirror } from "lib/topo/tools/stitcher";

class Arch extends Extension {
	static span: number = 0.1;
	static height: number = 25;
	static heightDiff: number = 1;
	static amplitude: number = 0;
	static tilt: number = 0;

	static configure(props: PartProps) {
		const { span, height, diff, amplitude, tilt } = props;

		Arch.span = span ? span : Arch.span;
		Arch.height = height ? height : Arch.height;
		Arch.heightDiff = diff ? diff - 0.5 : Arch.heightDiff;
		Arch.tilt = tilt ? 90 * tilt : Arch.tilt;
		Arch.amplitude = amplitude ? 90 * amplitude : Arch.amplitude;
	}

	static draw(att: IAttractor, a: number, b: number, c?: number): IHyperPoint[] {
		// .............................................
		// Key points

		const A = att
			.locate(a)
			.steer(Arch.tilt + Arch.amplitude)
			.offsetBy(Arch.height * (1 + Arch.heightDiff), "RAY")
			.flip();
		const B = att
			.locate(b)
			.steer(Arch.tilt - Arch.amplitude)
			.offsetBy(Arch.height * (1 + Arch.heightDiff), "RAY")
			.flip();

		const C = c ? att.locate(c) : att.locate(a + (b - a) / 2);

		const rootArch = att.extractPath(a, b);
		const rootArchPlot = rootArch.segments.map((sgm: any) => convertToHyperPoint(sgm));

		level(A, rootArchPlot[0]);
		level(rootArchPlot[rootArchPlot.length - 1], B);

		curve(B, A);

		B.handleOut.angle += Arch.amplitude;
		A.handleIn.angle -= Arch.amplitude;

		// clap(A)

		return [A, ...rootArchPlot, B];
	}

	configure(props: PartProps) {
		return Arch.configure(props);
	}

	draw(att: IAttractor, a: number, b: number, c?: number): IHyperPoint[] {
		return Arch.draw(att, a, b, c);
	}
}

export default Arch;
