import { Layer } from 'paper';
import { paperScope } from '../../components/paperStage';

import OrbitalField from '../attractors/orbitalField';

import Pen from '../../lib/topo/tools/pen';
import Plotter from '../../lib/topo/tools/plotter';

import { metricsFor, PHIGREATER, PHILESSER, SIN54 } from '../styles/metrics';
import { isEven, genRandom, genRandomDec } from '../../lib/topo/utils/helpers'


import { drawHead } from '../models/head';
import { drawFace } from '../models/face';


abstract class Archetype {

	
	protected _field: any;

	protected _pen: any;
	protected _plotter: any;

	protected _frame: any;
	
	protected _position: any;
	protected _radius: any;

	protected _PHI: any;
	protected _SIN: any;

	protected _head: any;
	protected _face: any;

	protected _hairModels: any;
	protected _hairlineModels: any;
	protected _hairTailModels: any;
	protected _earAccessoryModels: any;
	protected _neckAccessoryModels: any;
	protected _eyeFeatureModels: any;
	protected _faceFeatureModels: any;
	protected _headFeatureModels: any;


	constructor( position: any, radius: any ) {

		this._position = position;
		this._radius = radius;

		this._field = new OrbitalField( position, radius );

		this._pen = Pen.getInstance();
		this._plotter = Plotter.getInstance();

		this._PHI = metricsFor( radius ).PHI;
		this._SIN = metricsFor( radius ).SIN;

		this._frame = new Layer();

		this._head = drawHead( this._field, radius );
		this._face = drawFace( this._field, radius );


		this._hairModels = [];
		this._hairlineModels = [];
		this._hairTailModels = [];
		this._earAccessoryModels = [];
		this._neckAccessoryModels = [];
		this._eyeFeatureModels = [];
		this._faceFeatureModels = [];
		this._headFeatureModels = [];

	};

	get hairModels() {

		return this._hairModels;
	}

	get hairlineModels() {

		return this._hairlineModels;
	}

	get hairTailModels() {

		return this._hairTailModels;
	}

	get earAccessoryModels() {

		return this._earAccessoryModels;
	}

	get neckAccessoryModels() {

		return this._neckAccessoryModels;
	}

	get eyeFeatureModels() {

		return this._eyeFeatureModels;
	}

	get faceFeatureModels() {

		return this._faceFeatureModels;
	}

	get headFeatureModels() {

		return this._headFeatureModels;
	}

	get frame() {

		return this._frame;
	}

	get pen() {

		return this._pen;
	}

	get plotter() {

		return this._plotter;
	}

	get head() {

		return this._head;
	}

	get face() {

		return this._face;
	}

	get field() {

		return this._field;
	};


	get PHI() {

		return this._PHI;
	};


	get SIN() {

		return this._SIN;
	};

	get PHILESSER() {

		return PHILESSER;
	};

	get PHIGREATER() {

		return PHIGREATER;
	};

	get SIN54() {

		return SIN54;
	};


	private pickHair( catalog ) {

		return catalog[ genRandom(0, catalog.length-1) ];
	};


	private pickHairline( catalog ) {

		return catalog[ genRandom(0, catalog.length-1) ];
	};


	private pickHairTail( catalog ) {

		return catalog[ genRandom(0, catalog.length-1) ];
	};

	private pickEarAccessory( catalog ) {

		return catalog[ genRandom(0, catalog.length-1) ];
	};

	private pickNeckAccessory( catalog ) {

		return catalog[ genRandom(0, catalog.length-1) ];
	};

	// .................................................................................

	private randomize( input: any ) {

		if ( Array.isArray( input ) && input.length === 1 ) {

			return input[0];

		} else if ( !Array.isArray( input ) ) {

			return input;
		}

		return genRandomDec( input[0], input[1] );
	};




	// ---------------------------------------------------------------------------------

	protected generateHair( catalog: any ) {

		this._hairModels = [];

		const hairQueue =  [ this.pickHair( catalog ) ];

		while ( hairQueue.length > 0 && hairQueue[0] !== undefined  ) {

			const model = hairQueue.shift(); 

			console.log(`... creating hair model`);

			if ( !model.owner ) { model.owner = this._head };
			model.use =  model.create( this._head.field, model.size );
			model.use.configure( ...model.settings.map( (values) => this.randomize(values) ) );

			this._hairModels.push( model );

			// Check if there are sub-models

			if ( model.compats.length > 0 ) {

				const nModel = this.pickHair( model.compats );

				nModel.owner = model.use;
				nModel.use = nModel.create( model.use.field, nModel.size );
				nModel.use.configure( ...model.settings.map( (p) => this.randomize(p) ) );

				hairQueue.push( nModel );

				// for ( const nModel of model.compats ) {

				// 	nModel.owner = model.use;
				// 	nModel.use = nModel.create( model.use.field, nModel.size );
				// 	nModel.use.configure( ...model.settings.map( (p) => this.randomize(p) ) );

				// 	hairQueue.push( nModel );
				// }
			}
		};
	}

	protected generateHairline( catalog: any ) {

		this._hairlineModels = [];

		const hairlineQueue = [ this.pickHairline( catalog ) ];

		while ( hairlineQueue.length > 0 && hairlineQueue[0] !== undefined ) {

			const model = hairlineQueue.shift();

			console.log(`... creating hairline`);

			if ( !model.owner ) { model.owner = this._head };
			model.use = model.create( this._head.field, model.size );
			model.use.configure( ...model.settings.map( (values) => this.randomize(values) ) );

			this._hairlineModels.push( model );

			if ( model.compats.length > 0 ) {

				const nModel = this.pickHairline( model.compats );

				nModel.owner = model.use;
				nModel.use = nModel.create( model.use.field, nModel.size );
				nModel.use.configure( this.PHI.M );

				hairlineQueue.push( nModel );

				// for ( const nModel of model.compats ) {

				// 	nModel.owner = model.use;
				// 	nModel.use = nModel.create( model.use.field, nModel.size );
				// 	nModel.use.configure( this.PHI.M );

				// 	hairlineQueue.push( nModel );
				// }
			}
		};
	};


	protected generateHeadFeatures( catalog: any ) {

		this._headFeatureModels = [];

		const headFeaturesQueue = [ catalog[0] ];

		while ( headFeaturesQueue.length > 0 && headFeaturesQueue[0] !== undefined ) {

			const model = headFeaturesQueue.shift();

			console.log(`... creating head feature model`);

			model.owner = this._head;
			model.use = model.create( this._head.field, model.size );
			model.use.configure();

			this._headFeatureModels.push( model );

			if ( model.compats.length > 0 ) {

				for ( const nModel of model.compats ) {

					nModel.owner = model.use;
					nModel.use = nModel.create( model.use.field, nModel.size );
					nModel.use.configure();

					headFeaturesQueue.push( nModel );
				}
			}
		}
	};


	protected generateHairTail( catalog: any ) {

		this._hairTailModels = [];

		const hairTailsQueue = [ this.pickHairTail( catalog ) ];

		while ( hairTailsQueue.length > 0  && hairTailsQueue[0] !== undefined ) {

			const model = hairTailsQueue.shift();

			console.log(`... creating hair tail model`);

			model.use = model.create( this._field, model.size );
			model.use.configure( this.PHI.S, genRandom( 20, 50 ) );

			this._hairTailModels.push( model );

			if ( model.compats.length > 0 ) {

				for ( const nModel of model.compats ) {

					nModel.owner = model.use;
					nModel.use = nModel.create( model.use.field, nModel.size );
					nModel.use.configure( this.PHI.M );

					hairTailsQueue.push( nModel );
				}
			}
		};
	};
 

	protected generateEarAccessories( catalog: any ) {

		this._earAccessoryModels = [];

		const earAccessoriesQueue = [ catalog[0], catalog[1] ];

		while ( earAccessoriesQueue.length > 0 && earAccessoriesQueue[0] !== undefined ) {

			const model = earAccessoriesQueue.shift();

			console.log(`... creating ear accessory model`);

			model.owner = this._head;
			model.use = model.create( this._field, model.size );
			model.use.configure( );

			this._earAccessoryModels.push( model );

			if ( model.compats.length > 0 ) {

				for ( const nModel of model.compats ) {

					nModel.owner = model.use;
					nModel.use = nModel.create( model.use.field, nModel.size );
					nModel.use.configure();

					earAccessoriesQueue.push( nModel );
				}
			}
		}
	};


	protected generateNeckAccessories( catalog: any ) {

		this._neckAccessoryModels = [];

		const neckAccessoriesQueue = [ this.pickNeckAccessory( catalog ) ];

		while ( neckAccessoriesQueue.length > 0 && neckAccessoriesQueue[0] !== undefined ) {

			const model = neckAccessoriesQueue.shift();

			console.log(`... creating neck accessory model`);

			model.use = model.create( this._field, model.size );
			model.use.configure( );

			this._neckAccessoryModels.push( model );

			if ( model.compats.length > 0 ) {

				for ( const nModel of model.compats ) {

					nModel.owner = model.use;
					nModel.use = nModel.create( model.use.field, nModel.size );
					nModel.use.configure();

					neckAccessoriesQueue.push( nModel );
				}
			}
		}
	};


	protected generateFaceFeatures( catalog: any ) {

		this._faceFeatureModels = [];

		const faceFeaturesQueue = [ catalog[0], catalog[1] ];

		while ( faceFeaturesQueue.length > 0 && faceFeaturesQueue[0] !== undefined ) {

			const model = faceFeaturesQueue.shift();

			console.log(`... creating face feature model`);

			model.owner = this._face;
			model.use = model.create( this._face.field, model.size );
			model.use.configure();

			this._faceFeatureModels.push( model );

			if ( model.compats.length > 0 ) {

				for ( const nModel of model.compats ) {

					nModel.owner = model.use;
					nModel.use = nModel.create( model.use.field, nModel.size );
					nModel.use.configure();

					faceFeaturesQueue.push( nModel );
				}
			}
		}
	};


	protected generateEyeFeatures( catalog: any ) {

		this._eyeFeatureModels = [];

		const eyeFeaturesQueue = [ catalog[0], catalog[1] ];

		while ( eyeFeaturesQueue.length > 0 && eyeFeaturesQueue[0] !== undefined ) {

			const model = eyeFeaturesQueue.shift();

			console.log(`... creating eye feature model`);

			model.owner = this._face;
			model.use = model.create( this._face.field, this._face.leftEye.radius ); // TODO: improve how we get the radius of the eye
			model.use.configure( );

			this._eyeFeatureModels.push( model );


			if ( model.compats.length > 0 ) {

				for ( const nModel of model.compats ) {

					nModel.owner = model.use;
					nModel.use = nModel.create( model.use.field, nModel.size );
					nModel.use.configure();

					eyeFeaturesQueue.push( nModel );
				}
			}
		}
	};
	

	public clear() {

		this._frame.children.forEach( (child) => child.removeChildren() );

		const allOtherLayers = paperScope.project.layers.filter( (l) => l.id !== this._frame.id );
		allOtherLayers.forEach( (layer) => layer.removeChildren() );
	}
}


export default Archetype;



