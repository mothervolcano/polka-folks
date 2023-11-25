import { IAttractor } from "lib/topo/types";
import { IShape, ShapeProps } from "polka/types";

abstract class Shape implements IShape {
	abstract draw(field:IAttractor, props: ShapeProps): any;
}

export default Shape;
