import { Path } from 'paper';

import Pen from '../../lib/topo/tools/pen';

import { metricsFor, SIN9, SIN18, SIN36, SIN54, SIN72, PHIGREATER, PHILESSER } from '../styles/metrics';



abstract class Model {

	protected _pen: any;
	protected _path: any;

	protected _owner: any;
	
	protected _field: any;

	protected _level: any;

	protected _position: any;
	protected _radius: number;

	protected _A: any;
	protected _B: any;
	protected _C: any;
	protected _T: any;

	protected _PHI: any;
	protected _SIN: any;

	protected PINS: any;


	constructor( field: any, radius: number ) {

		this._pen = Pen.getInstance();

		this._owner = null;

		this._field = field;
		this._radius = radius;
		
		this._position = field.position;

		this._PHI = metricsFor( radius ).PHI;
		this._SIN = metricsFor( radius ).SIN;

		this._A = null;
		this._B = null;
		this._C = null;
		this._T = null;

		this.PINS = {

		}
	};

	get owner() {

		return this._owner;
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
	};


	get PHI() {

		return this._PHI;
	};

	get PHIGREATER() {

		return PHIGREATER;
	};

	get PHILESSER() {

		return PHILESSER;
	};


	get SIN() {

		return this._SIN;
	};

	get SIN9() {

		return SIN9;
	};


	get SIN18() {

		return SIN18;
	};
	

	get SIN36() {

		return SIN36;
	};

	get SIN54() {

		return SIN54;
	};


	get SIN72() {

		return SIN72;
	};


	get A() {

		return this._A.clone();
	};


	get B() {

		return this._B.clone();
	};


	get C() {

		return this._C.clone();
	};

	get T() {

		return this._T;
	};


	set owner( model: any ) {

		this._owner = model;
	}

	set path( p: any ) {

		this._path = p;
	}

	set level( value: number ) {

		this._level = value;
	}


	set A( P: any ) {

		this._A = P;
	};


	set B( P: any ) {

		this._B = P;
	};


	set C( P:any ) {

		this._C = P;
	};

	set T( P:any ) {

		this._T = P;
	};


	protected wrap( sgmA: any, sgmB: any ) {

		const headWrap = this.field.attractor.extractPath( sgmA, sgmB );
		headWrap.reverse();

		// TODO: it should check if the pen is already set with a path. If not, set this.path as default.

		this.pen.trim( headWrap );
		this.pen.getPath().join(headWrap);
		
	}


	public getPin( LABEL: string ) {

		return this.PINS[ LABEL ].clone();
	};


	// public configure() {


	// };


	// public plot() {


	// };

}

export default Model;

