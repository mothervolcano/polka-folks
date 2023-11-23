import { Path } from "paper";

import Model from "../core/model";

import Orbital from "../attractors/orbital";
import OrbitalField from "../attractors/orbitalField";

import { markPoint } from "../../lib/topo/utils/helpers";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

class Head extends Model {
	private _head: any;
	private _lEar: any;
	private _rEar: any;

	private _earsLat: number = 0;
	private _earsScale: number = 0;

	private frame: any;

	constructor(att: any) {
		super(att);

		this.name = "head";

		this.setPins({
			L_EAR_XT: null,
			L_EAR_XB: null,
			R_EAR_XT: null,
			R_EAR_XB: null,
			L_EAR_BC: null,
			R_EAR_BC: null,
		});

		this.setAtts({
			HEAD: null,
			EAR_L: null,
			EAR_R: null,
		});

		return this;
	}

	get attHead() {
		return this._head;
	}

	get head() {
		return this._head;
	}

	get leftEar() {
		return this._lEar;
	}

	get rightEar() {
		return this._rEar;
	}

	public configure(earsLatBaseValue: number = 0.01, earsScaleBaseValue: number) {
		this._earsLat = earsLatBaseValue;
		this._earsScale = earsScaleBaseValue ?? this.SIN72;

		this._head = new Orbital(this.PHI.BASE, this.attractor.center);

		this._lEar = new Orbital(this.SIN.XS);
		this._rEar = new Orbital(this.SIN.XS);
	}

	public plot(p2: number, p3: number, p4: number) {
		const field = new OrbitalField(this.attractor.center, this.PHI.BASE);

		field.addAttractors([this._lEar, this._rEar]);

		// this._field.compress( 0 + this._earsLat, 0.50 - this._earsLat );
		field.expandBy(this.SIN.XS * this.SIN18 * -1, "TAN");
		field.expandBy(this.SIN.XS * this.SIN36, "RAY");
		// this._field.scale( this._earsScale, this._earsScale );

		this.ATTS.HEAD = field.attractor;
		this.ATTS.EAR_L = this._lEar;
		this.ATTS.EAR_R = this._rEar;

		this.PINS.L_EAR_XT = this._head.locateFirstIntersection(this._lEar);
		this.PINS.R_EAR_XT = this._head.locateFirstIntersection(this._rEar);

		this.PINS.L_EAR_XB = this._head.locateLastIntersection(this._lEar);
		this.PINS.R_EAR_XB = this._head.locateLastIntersection(this._rEar);

		this.PINS.L_EAR_CB = this._lEar.locate(0.75);
		this.PINS.R_EAR_CB = this._rEar.locate(0.75);

		this.A = this.PINS.L_EAR_XT;
		this.B = this.PINS.R_EAR_XT;

		this.C = this.attractor.center;

		// markPoint( this.PINS.EAR_BL )
	}
}

let instance: Head | null = null;

export function drawHead(field: any): Head {
	if (!instance) {
		instance = new Head(field);
	}

	return instance;
}
