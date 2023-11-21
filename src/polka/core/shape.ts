import { IAttractor } from "../../lib/topo/types";
import { SIN9, SIN18, SIN36, SIN54, SIN72, PHIGREATER, PHILESSER, generateScaleFor } from "../styles/metrics";
import { IShape, MetricScale, ShapeProps } from "../types";

abstract class Shape implements IShape {
	abstract draw(field:IAttractor, props: ShapeProps): any;
}

export default Shape;
