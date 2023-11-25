import { IAttractor, IHyperPoint } from "lib/topo/types";
import { IPart, PartProps } from "polka/types";

abstract class Part implements IPart {
	abstract configure(props: PartProps): void;
	abstract draw(att: IAttractor, a: number, b: number, height: number, c?: number): any;
}

export default Part;
