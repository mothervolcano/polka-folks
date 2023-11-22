import { Group } from "paper";

class Composer {
	
	#type: string;
	#composition: any = {
		type: null,
		shape: null,
		shades: null,
		highlight: null,
		contrast: null,
	};

	constructor(type?: string) {
		this.#type = type || 'unknown';
		this.#composition.type = type;
	}

	public addForm(path: any) {
		// check if there a path already been added. If there is then create a group

		if (this.#composition.shape !== null) {
			if (this.#composition.shape.path instanceof Group) {
				this.#composition.shape.path.addChild(path);
			} else {
				const firstPath = this.#composition.shape.path;
				this.#composition.shape.path = new Group([firstPath, path]);
			}
		} else {
			this.#composition.shape = {
				type: "shape",
				path: path,
				inside: false,
			};
		}
	}

	public addShade(path: any) {}

	public addHighlight(path: any) {}

	public addContrast(path: any) {}

	get composition() {
		const comp = JSON.parse(JSON.stringify(this.#composition));

		this.#composition = {
			type: this.#type,
			shape: null,
			shades: null,
			highlight: null,
			contrast: null,
		};

		return comp;
	}
}

export default Composer;
