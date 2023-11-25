import { Path } from 'paper';

import { markPoint } from 'lib/topo/utils/helpers';

import { IModel } from 'polka/types';
import Model from 'polka/core/model';
import Orbital from 'polka/attractors/orbital';
import OrbitalField from 'polka/attractors/orbitalField';
import { curve } from 'lib/topo/tools/stitcher';


const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class IonicHair extends Model {

	
	constructor( base: IModel, type?: string ) {

		super( base, type );

		this.name = "Ionic hair"

		return this;

	};


	public configure() {

	};


	public plot( params: any, a: any, b: any ) {

		
		const { } = params;

		
		// .......................................
		// Calculate the params

		const lift = 0.15;
		const size = this.PHI.M;
		const volume = size * this.PHILESSER;


		// ........................................
		// Determine key points

		const O = this.base.attractor.center;

		const A = this.base.attractor.locate(a);
		const B = this.base.attractor.locate(b);


		// ........................................
		// Construction

		
		const field = new OrbitalField( O, this.PHI.L );

		field.addAttractor( new Orbital( size ) );
		field.addAttractor( new Orbital( size ) );


		// ........................................
		// Configuration


		field.compress( 0 + lift, 0.50 - lift )
		field.expandBy( volume, 'RAY');

		A.steer(-45)

		// ........................................
		// Plotting


		const pts1 = field.locate(0.90);
		const pts2 = field.locate(0.25);

		const P1 = pts1[0];
		const P2 = pts2[0];
		const P3 = pts2[1].flip();

		curve(P1, P2, 1);

		const path = new Path( { strokeColor: DEBUG_GREEN, closed: false } );

		this.pen.setPath( path );
		// this.pen.add( [ A, P1[0], P2[0], P3[0], P3[1].flip() ] );
		this.pen.add( [ A, P1, P2, P3 ] );

		this.pen.mirrorRepeat( 'HOR', false, true );

		const formaProps = {

			level: this.level,
			effect: "SOLID",
			scope: "ALL"
		}

		this.composer.init();
		this.composer.addPath(path, formaProps);

		return this.composer.wrap();

	};

}


let instance: IModel | null = null;


export function drawIonicHair( field: any, type?: string ): IModel {
  
  if (!instance) {

    instance = new IonicHair( field, type ) as IModel;
 
  }

  return instance;

}

