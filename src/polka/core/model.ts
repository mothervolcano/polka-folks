import { IHyperPoint, IAttractorField, IAttractor, IAttractorObject } from "../../lib/topo/types";

import AttractorObject from "../../lib/topo/core/attractorObject";
import Pen from "../../lib/topo/tools/pen";

import { IModel, MetricScale } from "../types";
import Composer from "./composer";

import { SIN9, SIN18, SIN36, SIN54, SIN72, PHIGREATER, PHILESSER, generateScaleFor } from "../styles/metrics";

abstract class Model {
	protected _pen: any;
	#name: string = "unknown";
	#composer: any;
	#path: any;
	#base: IModel | null;
	#attractor: IAttractor | null;

	#level: number = 0;

	#A: IHyperPoint | null;
	#B: IHyperPoint | null;
	#C: IHyperPoint | null;
	#T: IHyperPoint | null;

	#PHI: MetricScale | null = null;
	#SIN: MetricScale | null = null;

	#ATTS: any;
	#PINS: any;

	constructor(base: IAttractor | IModel, type?: string) {
		this._pen = Pen.getInstance();

		this.#composer = new Composer(type);

		// ------------------------------------------------
		// Foundational models that don't are not based on any model are defined by an attractor

		if (this.isAttractor(base)) {
			this.#base = null;
			this.#attractor = base;

			this.setScale(base.length / Math.PI / 2);
		} else {
			this.#base = base;
			this.#attractor = null;
			this.#level = this.#base.level;
		}

		this.#A = null;
		this.#B = null;
		this.#C = null;
		this.#T = null;

		this.#ATTS = {};
		this.#PINS = {};
	}

	private isAttractor(input: any): input is IAttractor {
		return input instanceof AttractorObject;
	}

	/** 
	* For non-base models (this.#base is false), dynamically adjust the level relative to the parent model's level.
	* Base models have a static level, set at instantiation and not modified here.	
    */
	public setLevel(value: number) {
		if (this.#base) {
			this.#level = this.#base.level + value;
		}
	}

	public setScale(baseValue: number) {
		this.#PHI = generateScaleFor("PHI", baseValue);
		this.#SIN = generateScaleFor("SIN", baseValue);
	}

	set name(value: string) {
		this.#name = value;
	}

	get name() {
		return this.#name;
	}

	get base() {
		if (!this.#base) {
			throw new Error(`ERROR @ Model: No base has been set for the ${this.#name} model`);
		}

		return this.#base;
	}

	get composer() {
		return this.#composer;
	}

	get pen() {
		return this._pen;
	}

	get path() {
		return this.#path;
	}

	// set level(value: number) {
	// 	this.#level = value;
	// }

	get level() {
		return this.#level;
	}

	set attractor(att: IAttractor) {
		this.#attractor = att;
	}

	get attractor() {
		if (!this.#attractor) {
			throw new Error(`ERROR @ Model: No attractor has been set for the ${this.#name} model`);
		}
		return this.#attractor;
	}

	get PHI() {
		if (!this.#PHI) {
			throw new Error(`PHI scale hasn't been defined on ${this.#name} Model`);
		}
		return this.#PHI;
	}

	get SIN() {
		if (!this.#SIN) {
			throw new Error(`SIN scale hasn't been defined on ${this.#name} Model`);
		}
		return this.#SIN;
	}

	get PHIGREATER() {
		return PHIGREATER;
	}

	get PHILESSER() {
		return PHILESSER;
	}

	get SIN9() {
		return SIN9;
	}

	get SIN18() {
		return SIN18;
	}

	get SIN36() {
		return SIN36;
	}

	get SIN54() {
		return SIN54;
	}

	get SIN72() {
		return SIN72;
	}

	get A() {
		if (!this.#A) {
			throw new Error(`A hasn't been defined on ${this.#name} Model`);
		}

		return this.#A.clone();
	}

	get B() {
		if (!this.#B) {
			throw new Error(`B hasn't been defined on ${this.#name} Model`);
		}

		return this.#B.clone();
	}

	get C() {
		if (!this.#C) {
			throw new Error(`C hasn't been defined on ${this.#name} Model`);
		}

		return this.#C.clone();
	}

	get T() {
		if (!this.#T) {
			throw new Error(`T hasn't been defined on ${this.#name} Model`);
		}

		return this.#T;
	}

	set path(p: any) {
		this.#path = p;
	}

	set A(P: IHyperPoint) {
		this.#A = P;
	}

	set B(P: IHyperPoint) {
		this.#B = P;
	}

	set C(P: IHyperPoint) {
		this.#C = P;
	}

	set T(P: IHyperPoint) {
		this.#T = P;
	}

	get PINS() {
		return this.#PINS;
	}

	get ATTS() {
		return this.#ATTS;
	}

	protected wrap(sgmA: any, sgmB: any) {
		const att = this.#attractor ? this.attractor : this.base.attractor;

		const headWrap = att.extractPath(sgmA, sgmB);
		headWrap.reverse();

		// TODO: it should check if the pen is already set with a path. If not, set this.path as default.

		this.pen.trim(headWrap);
		this.pen.getPath().join(headWrap);
	}

	public setPins(pins: any) {
		if (Object.keys(this.#PINS).length === 0) {
			this.#PINS = pins;
		} else {
			throw new Error(`ERROR @Model.setPins(${pins}) -> Pins can only be assigned once. (${this.#name})`);
		}
	}

	public setAtts(atts: any) {
		if (Object.keys(this.#ATTS).length === 0) {
			this.#ATTS = atts;
		} else {
			throw new Error(`ERROR @Model.setAtts(${atts}) -> Atts can only be assigned once. (${this.#name})`);
		}
	}

	public getPin(LABEL: string) {
		if (!this.#PINS[LABEL]) {
			throw new Error(`Missing Pin for ${LABEL}`);
		}

		return this.#PINS[LABEL].clone();
	}

	public getAtt(LABEL: string) {
		if (!this.#ATTS[LABEL]) {
			throw new Error(`Missing Attractor for ${LABEL}`);
		}

		return this.#ATTS[LABEL];
	}

	abstract configure(...args: any[]): void;

	abstract plot(params: any, ...args: any[]): any;
}

export default Model;
