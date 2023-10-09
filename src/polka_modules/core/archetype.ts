
import { Layer } from 'paper';
import { paper } from '../../components/paperStage';

import { OrientationType, PolarityType, IHyperPoint, IAttractor, PointLike, SizeLike } from '../../lib/topo/types';
import { IModel, ModelConfig } from '../types';

import OrbitalField from '../attractors/orbitalField';

import Pen from '../../lib/topo/tools/pen';
import Plotter from '../../lib/topo/tools/plotter';
import { convertToHyperPoint } from '../../lib/topo/utils/converters';

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

	protected _head: IModel;
	protected _face: IModel;

	protected pool: ModelConfig[] = [];
	protected collection: ModelConfig[] = [];

	protected _hairModels: ModelConfig[];
	protected _hairlineModels: ModelConfig[];
	protected _hairTailModels: ModelConfig[];
	protected _earAccessoryModels: ModelConfig[];
	protected _neckAccessoryModels: ModelConfig[];
	protected _eyeFeatureModels: ModelConfig[];
	protected _faceFeatureModels: ModelConfig[];
	protected _headFeatureModels: ModelConfig[];


	constructor( position: any, radius: number ) {

		this._position = position;
		this._radius = radius;

		this._field = new OrbitalField( convertToHyperPoint(position), radius );

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



	private pickModel( catalog: ModelConfig[] ) {

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


	protected mount( type: string ) {


		// Picks the first random hair model from the archetype's catalog and adds it to the queue
		const modelQueue =  [ this.pickModel( this.pool.filter((m)=>m.type===type&&m.order==='first')) ];

		while ( modelQueue.length > 0 && modelQueue[0] !== undefined  ) {

			// 
			const modelConfig = modelQueue.shift();

			if ( !modelConfig ) { throw new Error(`ERROR @ Archetype: failed to retrieve Hair Model from queue`) }

			console.log(`... creating hair model`);

			modelConfig.use = modelConfig.create( this._head.field, modelConfig.size );
			
			if ( modelConfig.base ) { modelConfig.use.baseOn(modelConfig.base) }


			modelConfig.use.configure( ...modelConfig.settings.map( (values: any[]) => this.randomize(values) ) );

			this.collection.push( modelConfig );

			// Check if there are sub-models

			if ( modelConfig.compats.length > 0 ) {

				const nModelConfig = this.pickModel( modelConfig.compats );

				// nModelConfig.base = modelConfig.use;
				nModelConfig.use = nModelConfig.create( modelConfig.use.field, nModelConfig.size );
				nModelConfig.use.baseOn(modelConfig.use);
				nModelConfig.use.configure( ...modelConfig.settings.map( (p: any[]) => this.randomize(p) ) );

				modelQueue.push( nModelConfig );

				// for ( const nModel of model.compats ) {

				// 	nModel.owner = model.use;
				// 	nModel.use = nModel.create( model.use.field, nModel.size );
				// 	nModel.use.configure( ...model.settings.map( (p) => this.randomize(p) ) );

				// 	hairQueue.push( nModel );
				// }
			}
		};

	}
	

	public clear() {

		this._frame.children.forEach( (child: any) => child.removeChildren() );

		const allOtherLayers = paper.project.layers.filter( (l) => l.id !== this._frame.id );
		allOtherLayers.forEach( (layer) => layer.removeChildren() );
	}
}


export default Archetype;



