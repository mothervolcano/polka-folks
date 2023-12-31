import { Path, CompoundPath } from 'paper';

import { merge, measure, mid, curve } from 'lib/topo/tools/stitcher';
import { markPoint, genRandom, genRandomDec } from 'lib/topo/utils/helpers';

import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';


import { IModel } from 'polka/types';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class ArthurHair extends Model {

	
	constructor( base: IModel, type?: string  ) {

		super( base, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number ) {


		// .............................................
		// Compute parameters

		const span = 0.15;
		const splitLatitude = this.base.PHI.BASE * this.SIN9;

		// .............................................
		// Key points

		const C = this.base.attractor.locate( 0.25 );
		const A = this.base.attractor.locate( 0.25 - span );
		const B = this.base.attractor.locate( 0.25 + span );

		// .............................................
		// Construction


		// .............................................
		// Configure




		// .............................................
		// Plotting

		const R0 = C.clone().steer( 0, 90 ).scaleHandles( 0, true, false );
		const R1 = merge( B.clone().steer(60, 180), B.clone().flip() );
		const R2 = C.clone().offsetBy( splitLatitude, 'VER' ).steer(0, 290).flip().scaleHandles( 0, false, true );

		curve( R1, R2, 2/3, 2/3 );


		// ............................................................

		const _path1 = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 1,
			closed: true
		});

		this.pen.setPath( _path1 );
		this.pen.add( [ R0, R1, R2 ] );

		const _path2 = _path1.clone();

		_path2.pivot = _path1.firstSegment.point;
		_path2.scale(-1,1);


		this.path = new CompoundPath([]);
		this.path.addChildren( [ _path1, _path2 ] );


		const instructions = {

			level: this.level,
			complete: true,
			gradient: null
		}

		// .............................................
		// Chart

		return [ instructions, this.path ];

	};
}


let instance: IModel | null = null;

export function drawArthurHair( base: IModel, type?: string  ): IModel {
  
  if (!instance) {

    instance = new ArthurHair( base, type ) as IModel;
  }

  return instance;
}