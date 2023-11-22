import { Path } from 'paper';

import Model from '../core/model';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Jabot extends Model {


	private _jabotSize: number = 0;
	private _tieLength1: number = 0;
	private _tieLength2: number = 0;
	

	constructor( position: any, radius: any, type?: string ) {

		super( position, radius, type );

	};


	public configure() {
	
		this._jabotSize = this.PHI.M;
		this._tieLength1 = this.PHI.L;
		this._tieLength2 = this.PHI.L * this.SIN36;
	};


	public plot( params: any, lvl: number, c: number ) {

		const {} = params;

		// ....................................
		// set the parameters




		// .....................................
		// determine the key points

		const C = this.field.attractor.locate(c);

		const att1 = new Orbital( [ this._jabotSize, this._jabotSize * this.SIN36 ], C );

		const wC = 0.06;
		const wA = 0.05;
		const wB = 0.05;
		const lC = this._tieLength1;
		const lA = this._tieLength2;
		const lB = this._tieLength2;

		const A1 = att1.locate( 0.75 + wC + wA ).offsetBy( lA, 'RAY' ).scaleHandles( 0, false, true ).scaleHandles(2/3);
		const A2 = att1.locate( 0.75 + wC + wA ).flip().scaleHandles( 0 );
		const A3 = att1.locate( 0.75 ).flip().scaleHandles( 0 );
		const A4 = att1.locate( 0.75 ).offsetBy( lA, 'RAY' ).scaleHandles( 0, true, false ).scaleHandles(2/3);

		const B1 = att1.locate( 0.75 ).offsetBy( lB, 'RAY' ).scaleHandles( 0, false, true ).scaleHandles(2/3);
		const B2 = att1.locate( 0.75 ).flip().scaleHandles( 0 );
		const B3 = att1.locate( 0.75 - wC - wB ).flip().scaleHandles( 0 );
		const B4 = att1.locate( 0.75 - wC - wB ).offsetBy( lB, 'RAY' ).scaleHandles( 0, true, false ).scaleHandles(2/3);

		const C1 = att1.locate( 0.75 + wC ).offsetBy( lC, 'RAY' ).scaleHandles( 0, false, true );
		const C2 = att1.locate( 0.75 + wC ).scaleHandles( 0 );
		const C3 = att1.locate( 0.75 - wC ).scaleHandles( 0 );
		const C4 = att1.locate( 0.75 - wC ).offsetBy( lC, 'RAY' ).scaleHandles( 0, true, false );

		const instructions = {

			level: 0,
			gradient: null
		}

		const path1 = new Path({ closed: true });

		this.pen.setPath( path1 );
		this.pen.add( [ A1, A2, A3, A4 ] );

		const path2 = new Path({ closed: true });

		this.pen.setPath( path2 );
		this.pen.add( [ B1, B2, B3, B4 ] );

		const path3 = new Path({ closed: true });

		this.pen.setPath( path3 );
		this.pen.add( [ C1, C2, C3, C4 ] );

		this.composer.init();
		this.composer.addPath(path1, lvl);
		this.composer.addPath(path2, lvl);
		this.composer.addPath(path3, lvl);

		return this.composer.wrap();

		// return [ instructions, [ instructions, path1 ], [ instructions, path2 ], [ instructions, path3 ] ];
	};
}


let instance: Jabot | null = null;

export function drawJabot( position: any, radius: any, type?: string ): Jabot {
  
  if (!instance) {

    instance = new Jabot(position, radius, type );
  }

  return instance;

}