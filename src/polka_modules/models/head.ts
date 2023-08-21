import { Path } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

// import { Ruler, useRuler } from '../../../../lib/topo/tools/ruler';

import DebugDot from '../../lib/topo/utils/debugDot';
import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Head extends BaseModel {

	private _head: any;
	private _lEar: any;
	private _rEar: any;

	private _earsLat: number;
	private _earsScale: number

	private frame: any;

	private  ATTS: any;

	constructor( field: any, radius: number ) {

		super( field, radius );

		this.PINS = {

			L_EAR_XT: null,
			L_EAR_XB: null,
			R_EAR_XT: null,
			R_EAR_XB: null,
			L_EAR_BC: null,
			R_EAR_BC: null
		}

		this.ATTS = {

			EAR_L: null,
			EAR_R: null
		}
		
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

	public getAtt( ATT: string ) {

		return this.ATTS[ATT];
	}

	public configure( earsLatBaseValue: number = 0.01, earsScaleBaseValue: number ) {


		this._earsLat = earsLatBaseValue;
		this._earsScale = earsScaleBaseValue ?? this.SIN72;

		this._head = new Orbital( this.radius, this.position );

		this._lEar = new Orbital( this.SIN.XS );
		this._rEar = new Orbital( this.SIN.XS );

	}


	public plot( p2: number, p3: number, p4: number, ) {


		const field = new OrbitalField( this._position, this.radius );

		field.addAttractors( [ this._lEar, this._rEar ] );

		// this._field.compress( 0 + this._earsLat, 0.50 - this._earsLat );
		field.expandBy( this.SIN.XS * this.SIN18 * -1, 'TAN' );
		field.expandBy( this.SIN.XS * this.SIN36, 'RAY' );
		// this._field.scale( this._earsScale, this._earsScale );


		this.ATTS.EAR_L = this._lEar;
		this.ATTS.EAR_R = this._rEar;

		this.PINS.L_EAR_XT = this._head.locateFirstIntersection( this._lEar );
		this.PINS.R_EAR_XT = this._head.locateFirstIntersection( this._rEar );

		this.PINS.L_EAR_XB = this._head.locateLastIntersection( this._lEar );
		this.PINS.R_EAR_XB = this._head.locateLastIntersection( this._rEar );

		this.PINS.L_EAR_CB = this._lEar.locate(0.75);
		this.PINS.R_EAR_CB = this._rEar.locate(0.75);


		this.A = this.PINS.L_EAR_XT;
		this.B = this.PINS.R_EAR_XT;

		// markPoint( this.PINS.EAR_BL )

	}
}


let instance: Head | null = null;


export function drawHead( field: any, radius: number ): Head {
  
  if (!instance) {
    instance = new Head( field, radius );
  }

  return instance;
}

