import { Group } from "paper";

import _ from "lodash";

class Composer {
	#type: string;
	#composition: any;

	constructor(type?: string) {
		this.#type = type || "unknown";
		this.#composition = {
			type: this.#type,
			form: null,
			shades: null,
			highlight: null,
			contrast: null,
		};
	}

	public addPath(path: any) {
		// check if there a path already been added. If there is then create a group

		if (this.#composition.form !== null) {
			if (this.#composition.form.path instanceof Group) {
				if (path instanceof Group) {
					this.#composition.form.path.addChildren(path.children);
				} else {
					this.#composition.form.path.addChild(path);
				}
			} else {
				const firstPath = this.#composition.form.path;
				this.#composition.form.type = "group";
				this.#composition.form.path = new Group([firstPath, path]);
			}
		} else {
			this.#composition.form = {
				type: path instanceof Group ? "group" : "path",
				path: path,
				inside: false,
			};
		}
	}

	public addPaths(paths: any) {
		if (Array.isArray(paths)) {
			this.addPath(new Group(paths));
		}
	}

	public addShade(path: any) {}

	public addHighlight(path: any) {}

	public addContrast(path: any) {}

	public wrap() {
		// const comp = _.cloneDeep(this.#composition);

		// this.#composition = {
		// 	type: this.#type,
		// 	form: null,
		// 	shades: null,
		// 	highlight: null,
		// 	contrast: null,
		// };

		// return comp;
		return this.#composition;
	}

	public init() {
		this.#composition = {
			type: this.#type,
			form: null,
			shades: null,
			highlight: null,
			contrast: null,
		};
	}

	get composition() {
		return this.#composition;
	}
}

export default Composer;
