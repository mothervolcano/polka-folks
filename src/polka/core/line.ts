import { IHyperPoint } from "lib/topo/types";
import { LineProps } from "polka/types";

abstract class Line {

	abstract configure(props: LineProps): void
	abstract draw(A: IHyperPoint, B: IHyperPoint, C?: IHyperPoint): IHyperPoint[]
}

export default Line;