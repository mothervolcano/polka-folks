import { IAttractor, IHyperPoint } from "lib/topo/types";
import { IPart, PartProps } from "polka/types";

abstract class Extension implements IPart {
	abstract configure(props: PartProps): void;
	abstract draw(att: IAttractor, a: number, b: number, c?: number): IHyperPoint[];
}

export default Extension;
