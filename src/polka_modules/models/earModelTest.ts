import { Path, CompoundPath } from 'paper';

import BaseModel from './baseModel';
import Orbital from '../attractors/orbital';
import OrbitalField from '../attractors/orbitalField';

import { drawLozenge } from './lozenge';
import { drawDrop } from './drop';
import { drawCone } from './cone';

import { merge, measure, mid, curve } from '../../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class EarModelTest extends BaseModel {


	private _shapes: any;


	constructor( field: any, radius: number ) {

		super( field, radius );

		// this._shapes = [ useLozenge, useDrop ];
		this._shapes = [ drawCone ];

		return this;

	}

	private pickShape() {

		return this._shapes[ genRandom(0, this._shapes.length - 1) ];
	}


	public configure() {

		this.level = 2;

	};


	public plot( params: any, ATT: string, c: number ) {


		// .............................................
		// Compute parameters

		const size = this.radius * this.SIN36 * 5;
		const num = 1;

		// .............................................
		// Key points

		let O = this.owner.getAtt(ATT).locate(0.75);

		// .............................................
		// Construction

		const plots = [];

		for ( let i=0; i<num; i++ ) {

			const _att = new Orbital( size, O );
			_att.anchorAt(O);
			_att.moveBy( size + 400, 'HOR' );

			O = _att.locate(0.50);

			_att.rotate(-90)

			const _shape = this.pickShape();
			_shape(size);

			plots.push( _shape().plot(_att, 200) );

			// adjust positioning of the attractor based on the resulting plot



		}


		// .............................................
		// Configure



		// .............................................
		// Plotting


		// ............................................................

		const paths = plots.map( ( plot ) => {

			const _path = new Path({

				fillColor: DEBUG_GREEN,
				strokeWidth: 1,
				closed: true

			})

			this.pen.setPath( _path )
			this.pen.add( plot )

		});

		this.path = new CompoundPath(null);
		this.path.addChildren( paths );

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


let instance: EarModelTest | null = null;

export function drawEarModelTest( field: any, radius: number ): EarModelTest {
  
  if (!instance) {

    instance = new EarModelTest( field, radius );
  }

  return instance;
}