
import { SIN9, SIN18, SIN36, SIN54, SIN72, PHIGREATER, PHILESSER, generateScaleFor } from '../styles/metrics';
import { MetricScale } from '../types';



abstract class Shape {

	protected _path: any;

	protected _position: any;
	protected _radius: number;

	protected _PHI: MetricScale;
	protected _SIN: MetricScale;

	protected _C: any;


	constructor( radius: number ) {

		this._radius = radius;

		this._PHI = generateScaleFor("PHI", radius);
		this._SIN = generateScaleFor("SIN", radius);

		this._C = null;
	};

	set C( pt: any ) {

		this._C = pt.clone();
	}


	get C() {

		return this._C;
	}

	
	get radius() {

		return this._radius;
	}


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



	// protected wrap( sgmA: any, sgmB: any ) {

	// 	const headWrap = this.field.attractor.extractPath( sgmA, sgmB );
	// 	headWrap.reverse();

	// 	// TODO: it should check if the pen is already set with a path. If not, set this.path as default.

	// 	this.pen.trim( headWrap );
	// 	this.pen.getPath().join(headWrap);
		
	// }


	// public plot() {


	// };

}

export default Shape;

