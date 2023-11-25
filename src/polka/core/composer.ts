import { Group } from "paper";

class Composer {
	#type: string;
	#composition: any;

	constructor(type?: string) {
		this.#type = type || "unknown";
		this.#composition = {
			type: this.#type,
			forma: null,
			shade: null,
			capital: null,
			contrast: null,
		};
	}

	public addPath(path: any, props: any) {
		// ...

		const {level, effect, scope} = props;

		if (this.#composition.forma !== null) {
			if (this.#composition.forma.path instanceof Group) {
				if (path instanceof Group) {
					this.#composition.forma.path.addChildren(path.children);
				} else {
					this.#composition.forma.path.addChild(path);
				}
			} else {
				const firstPath = this.#composition.forma.path;
				this.#composition.forma.type = "group";
				this.#composition.forma.path = new Group([firstPath, path]);
			}
		} else {
			this.#composition.forma = {
				type: path instanceof Group ? "group" : "path",
				path: path,
				scope: scope || 'ALL',
				inside: false,
			};
		}
		this.#composition.forma.level = level;
	}

	public addShade(path: any, props: any) {
		// ...

		const {level, effect, scope} = props;

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
				scope: scope || 'EACH',
				effect: effect || 'OVERLAY',
				inside: false,
			};
		}
		this.#composition.shade.level = level;
	}

	public addPaths(paths: any, props: any) {
		if (Array.isArray(paths)) {
			this.addPath(new Group(paths), props);
		}
	}

	public addShades(paths: any, props: any) {
		if (Array.isArray(paths)) {
			this.addShade(new Group(paths), props);
		}
	}

	public addCapital(path: any, props: any) {

		const {level, effect, scope} = props;

		this.#composition.capital = {
				type: path instanceof Group ? "group" : "path",
				path: path,
				scope: scope || 'ALL',
				inside: false,
			};

		this.#composition.capital.level = level;
	}

	public addContrast(path: any) {}

	public wrap() {
		// const comp = _.cloneDeep(this.#composition);

		// this.#composition = {
		// 	type: this.#type,
		// 	forma: null,
		// 	shades: null,
		// 	central: null,
		// 	contrast: null,
		// };

		// return comp;
		return this.#composition;
	}

	public init() {
		this.#composition = {
			type: this.#type,
			forma: null,
			shade: null,
			capital: null,
			contrast: null,
		};
	}

	get composition() {
		return this.#composition;
	}
}

export default Composer;
