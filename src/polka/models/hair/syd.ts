import { Path } from 'paper';

import { merge, measure, mid, curve, level, bounce, budge, breakIn, breakOut } from 'lib/topo/tools/stitcher';
import { markPoint, genRandom, genRandomDec } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Syd extends Model {

	
	constructor( base: IModel, type?: string  ) {

		super( base, type );

		return this;

	}


	public configure() {

	};


	public plot( params: any, lvl: number, c: number ) {


		// .............................................
		// Compute parameters

		const position = genRandomDec( 0.15, 0.45 );
		const span = 0.05;
		const r = this.base.PHI.BASE * this.SIN9;
		const volume = this.base.PHI.BASE + this.PHI.XS;

		const length = this.base.PHI.BASE + genRandomDec( -this.PHI.S, this.PHI.L );

		// .............................................
		// Key points

		const O = this.base.attractor.center.offsetBy( -this.base.PHI.BASE * 0.25, 'VER' );


		// .............................................
		// Construction

		const field = new OrbitalField( O, volume );

		const att = new Orbital( r );

		field.addAttractor( att, position );

		// .............................................
		// Configure



		// .............................................
		// Plotting
		
		const C = field.attractor.locate( position );

		const P1 = field.attractor.locate(position - span);
		const P2 = C.clone().offsetBy( length, 'RAY' ).steer(0, 350);
		const P3 = field.attractor.locate(position + span);


		// ............................................................

		this.path = new Path({ 

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2,
			closed: true
		});

		this.pen.setPath( this.path );
		this.pen.add( [ P1, P2, P3 ] );

		const _path = field.attractor.getPath();
		_path.divideAt( _path.getNearestLocation( this.base.getAtt('EAR_R').center.point ) )
		_path.splitAt( _path.getNearestLocation( this.base.getAtt('EAR_L').center.point ) );
		_path.lastSegment.remove();
		_path.lastSegment.remove();
		
		this.pen.trim( _path );	
		_path.closed = true;

		_path.fullySelected = true;

		this.path = _path.unite( this.path );

		// _path.remove();

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

export function drawSyd( base: IModel, type?: string  ): IModel {
  
  if (!instance) {

    instance = new Syd( base, type ) as IModel;
  }

  return instance;
}