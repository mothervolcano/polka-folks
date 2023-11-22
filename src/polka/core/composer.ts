import { Group } from "paper";

class Composer {
	#type: string;
	#composition: any;

	constructor(type?: string) {
		this.#type = type || "unknown";
		this.#composition = {
			type: this.#type,
			form: null,
			shade: null,
			highlight: null,
			contrast: null,
		};
	}

	public addPath(path: any, level: number) {
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
		this.#composition.form.level = level;
	}

	public addShade(path: any, level: number, props: any) {
		// ...

		const {effect, scope} = props;

		if (this.#composition.shade !== null) {
			if (this.#composition.shade.path instanceof Group) {
				if (path instanceof Group) {
					this.#composition.shade.path.addChildren(path.children);
				} else {
					this.#composition.shade.path.addChild(path);
				}
			} else {
				const firstPath = this.#composition.shade.path;
				this.#composition.shade.type = "group";
				this.#composition.shade.path = new Group([firstPath, path]);
			}
		} else {
			this.#composition.shade = {
				type: path instanceof Group ? "group" : "path",
				path: path,
				inside: false,
				effect: effect || 'OVERLAY',
				scope: scope || 'SINGLE'
			};
		}
		this.#composition.shade.level = level;
	}

	public addPaths(paths: any, level: number) {
		if (Array.isArray(paths)) {
			this.addPath(new Group(paths), level);
		}
	}

	public addShades(paths: any, level: number, props: any) {
		if (Array.isArray(paths)) {
			this.addShade(new Group(paths), level, props);
		}
	}

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
			shade: null,
			highlight: null,
			contrast: null,
		};
	}

	get composition() {
		return this.#composition;
	}
}

export default Composer;
