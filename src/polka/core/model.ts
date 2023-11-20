import { Path } from "paper";

import {
	OrientationType,
	PolarityType,
	IHyperPoint,
	IDisplayObject,
	IAttractor,
	IAttractorField,
	PointLike,
	SizeLike,
} from "../../lib/topo/types";

import Pen from "../../lib/topo/tools/pen";

import {
	metricsFor,
	SIN9,
	SIN18,
	SIN36,
	SIN54,
	SIN72,
	PHIGREATER,
	PHILESSER,
} from "../styles/metrics";
import { IModel } from "../types";

abstract class Model {
	protected _pen: any;
	protected _path: any;

	protected _base: IModel | null;

	protected _field: IAttractorField;

	protected _level: any;

	protected _position: any;
	protected _radius: number;

	protected _A: IHyperPoint | null;
	protected _B: IHyperPoint | null;
	protected _C: IHyperPoint | null;
	protected _T: IHyperPoint | null;

	#PHI: any;
	protected _SIN: any;

	protected ATTS: any;
	protected PINS: any;

	constructor(field: IAttractorField, radius: number) {
		this._pen = Pen.getInstance();

		this._base = null;

		this._field = field;
		this._radius = radius;

		this._position = field.attractor.center;

		this.#PHI = metricsFor(radius).PHI;
		this._SIN = metricsFor(radius).SIN;

		this._A = null;
		this._B = null;
		this._C = null;
		this._T = null;

		this.ATTS = {};

		this.PINS = {};
	}

	baseOn(model: IModel) {
		this._base = model;
	}

	get base() {
		if (!this._base) {
			throw new Error(
				`ERROR @ Model: No base has been set for this model`,
			);
		}

		return this._base;
	}

	get pen() {
		return this._pen;
	}

	get path() {
		return this._path;
	}

	get level() {
		return this._level;
	}

	get position() {
		return this._position;
	}

	get radius() {
		return this._radius;
	}

	get field() {
		return this._field;
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
		return this._SIN;
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
		if (!this._A) {
			throw new Error(`A hasn't been defined on Model`);
		}

		return this._A.clone();
	}

	get B() {
		if (!this._B) {
			throw new Error(`B hasn't been defined on Model`);
		}

		return this._B.clone();
	}

	get C() {
		if (!this._C) {
			throw new Error(`C hasn't been defined on Model`);
		}

		return this._C.clone();
	}

	get T() {
		if (!this._T) {
			throw new Error(`T hasn't been defined on Model`);
		}

		return this._T;
	}

	set path(p: any) {
		this._path = p;
	}

	set level(value: number) {
		this._level = value;
	}

	set A(P: IHyperPoint) {
		this._A = P;
	}

	set B(P: IHyperPoint) {
		this._B = P;
	}

	set C(P: IHyperPoint) {
		this._C = P;
	}

	set T(P: IHyperPoint) {
		this._T = P;
	}

	protected wrap(sgmA: any, sgmB: any) {
		const headWrap = this.field.attractor.extractPath(sgmA, sgmB);
		headWrap.reverse();

		// TODO: it should check if the pen is already set with a path. If not, set this.path as default.

		this.pen.trim(headWrap);
		this.pen.getPath().join(headWrap);
	}

	public getPin(LABEL: string) {
		if (!this.PINS[LABEL]) {
			throw new Error(`Missing Pin for ${LABEL}`);
		}

		return this.PINS[LABEL].clone();
	}

	public getAtt(LABEL: string) {
		if (!this.ATTS[LABEL]) {
			throw new Error(`Missing Attractor for ${LABEL}`);
		}

		return this.ATTS[LABEL];
	}

	abstract configure(...args: any[]): void;

	abstract plot(params: any, ...args: any[]): any;
}

export default Model;