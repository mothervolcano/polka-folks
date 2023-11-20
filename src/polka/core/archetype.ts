import { ModelConfig } from "../types";



abstract class Archetype {

	#pool: ModelConfig[];

	constructor() {

		this.#pool = [];
	}
}

export default Archetype;