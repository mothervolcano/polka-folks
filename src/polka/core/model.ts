import {
	IHyperPoint,
	IAttractorField,
} from "../../lib/topo/types";

import Pen from "../../lib/topo/tools/pen";
import Composer from "./composer";

import {
	SIN9,
	SIN18,
	SIN36,
	SIN54,
	SIN72,
	PHIGREATER,
	PHILESSER,
    generateScaleFor,
} from "../styles/metrics";
import { IModel, MetricScale } from "../types";

abstract class Model {
	protected _pen: any;
	#composer: any;
	#path: any;
	#base: IModel | null;
	#field: IAttractorField;

	#level: any;

	#position: any;
	#radius: number;

	#A: IHyperPoint | null;
	#B: IHyperPoint | null;
	#C: IHyperPoint | null;
	#T: IHyperPoint | null;

	#PHI: MetricScale;
	#SIN: MetricScale;

	#ATTS: any;
	#PINS: any;

	constructor(field: IAttractorField, radius: number, type?: string) {
		this._pen = Pen.getInstance();

		this.#composer = new Composer(type);

		this.#base = null;

		this.#field = field;
		this.#radius = radius;

		this.#position = field.attractor.center;

		this.#PHI = generateScaleFor("PHI", radius);
		this.#SIN = generateScaleFor("SIN", radius);

		this.#A = null;
		this.#B = null;
		this.#C = null;
		this.#T = null;

		this.#ATTS = {};
		this.#PINS = {};
	}

	baseOn(model: IModel) {
		this.#base = model;
	}

	hasBase(): boolean {
		return Boolean(this.#base);
	}

	get base() {
		if (!this.#base) {
			throw new Error(
				`ERROR @ Model: No base has been set for this model`,
			);
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

	get level() {
		return this.#level;
	}

	get position() {
		return this.#position;
	}

	get radius() {
		return this.#radius;
	}

	get field() {
		return this.#field;
	}

	get PHI() {
		return this.#PHI;
	}

	get PHIGREATER() {
		return PHIGREATER;
	}

	get PHILESSER() {
		return PHILESSER;
	}

	get SIN() {
		return this.#SIN;
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
			throw new Error(`A hasn't been defined on Model`);
		}

		return this.#A.clone();
	}

	get B() {
		if (!this.#B) {
			throw new Error(`B hasn't been defined on Model`);
		}

		return this.#B.clone();
	}

	get C() {
		if (!this.#C) {
			throw new Error(`C hasn't been defined on Model`);
		}

		return this.#C.clone();
	}

	get T() {
		if (!this.#T) {
			throw new Error(`T hasn't been defined on Model`);
		}

		return this.#T;
	}

	set path(p: any) {
		this.#path = p;
	}

	set level(value: number) {
		this.#level = value;
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
		const headWrap = this.field.attractor.extractPath(sgmA, sgmB);
		headWrap.reverse();

		// TODO: it should check if the pen is already set with a path. If not, set this.path as default.

		this.pen.trim(headWrap);
		this.pen.getPath().join(headWrap);
	}

	public setPins(pins: any) {

		if (Object.keys(this.#PINS).length === 0) {
            this.#PINS = pins;
        } else {
        	throw new Error(`ERROR @Model.setPins(${pins}) -> Pins can only be assigned once.`)
        }
	}

	public setAtts(atts: any) {

		if (Object.keys(this.#ATTS).length === 0) {
            this.#ATTS = atts;
        } else {
        	throw new Error(`ERROR @Model.setAtts(${atts}) -> Atts can only be assigned once.`)
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
