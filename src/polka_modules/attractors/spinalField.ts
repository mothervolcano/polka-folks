import { OrientationType, PolarityType, PathLocationData, UnitIntervalNumber, IHyperPoint, PointLike, SizeLike } from '../../lib/topo/types';

import AttractorField from '../../lib/topo/core/attractorField';
import Spine from './spine';
import Orbital from './orbital';

import { isEven, isOdd } from '../../lib/topo/utils/helpers';



class SpinalField extends AttractorField {

	private _positionData: any;

	private _length: number;
	private _mode: string;
	
	
	constructor( positionData: PointLike, length: number | null, mode: string = 'DIRECTED' ) {

		const _path = Spine.project( positionData, length )

		super( _path.getPointAt( _path.length/2 ), _path.bounds.size )

		this._positionData = positionData;

		this._length = _path.length;
		this._mode = mode;

		this.render();

		return this;
	};


	protected render() {

		if ( this.isRendered ) {

			this._content.remove();
			this.isRendered = false;
		}

		this._attractor = new Spine( this._length, this._positionData );
		this._attractor.orientation = this.orientation;
		this._attractor.polarity = this.polarity;

		this.arrangeAttractors( this.filterAttractors() );

		// super.render( this._attractor._content );
		super.render( this._attractor.path );

	};

	public adjustRotationToPosition( anchor: any, isPositive: Function, isNegative: Function  ) {

		if ( !this._attractor ) { throw new Error('Orbital Field has no defined base attractor') };

		this._attractor.adjustRotationToPosition( anchor, isPositive, isNegative );
	};

	public adjustToOrientation( anchor: any, isPositive: Function, isNegative: Function ) {

		if ( !this._attractor ) { throw new Error('Orbital Field has no defined base attractor') };

		this._attractor.adjustToOrientation( anchor, isPositive, isNegative );
	};

	public adjustToPolarity( anchor: any ) {

		if ( !this._attractor ) { throw new Error('Orbital Field has no defined base attractor') };

		this._attractor.adjustToPolarity( anchor );
	};


	protected configureAttractor( att: any, anchor: IHyperPoint ) {

		switch ( this._mode ) {


		case 'SYMMETRICAL':

			att.adjustRotationToPosition( 

	        	anchor,
	        	(pos:number) => { return pos < 0.5  },
	        	(pos:number) => { return pos >= 0.5 },

	        );

			att.adjustToOrientation( 
	            anchor,
	            (pos:number) => { return pos < 0.5  }, // the condition of this field for the orientation to be 1
	            (pos:number) => { return pos >= 0.5 }, // the condition of this field for the orientation to be -1
			);

			break;

		case 'ALTERNATED': // TODO: need to know the order of each att

			att.adjustRotationToPosition( 

	        	anchor,
	        	(pos:number) => { return isEven(pos) },
	        	(pos:number) => { return isOdd(pos) },

	        );

			att.adjustToOrientation( 
	            anchor,
	            (pos:number) => { return isEven(pos)  }, // the condition of this field for the orientation to be 1
	            (pos:number) => { return isOdd(pos) }, // the condition of this field for the orientation to be -1
			);

			break;


		case 'DIRECTED':

			att.adjustRotationToPosition( 

	        	anchor,
	        	(pos:number) => { return pos >= 0 },
	        	(pos:number) => { return false },

	        );

			att.adjustToOrientation( 
	            anchor,
	            (pos:number) => { return pos >= 0  }, // the condition of this field for the orientation to be 1
	            (pos:number) => { return false }, // the condition of this field for the orientation to be -1
			);

			break;

		}
		
		
		
		att.adjustToPolarity( anchor );

	}


	// protected calculateRotation( i: number, anchor: any ) {

	// 	if ( isEven(i) ) {

	// 		return 0;

	// 	} else {

	// 		return this._mode === 'DIRECTED' ? 0 : 180;
	// 	}
	// };


	set mode( value: string ) {

		this._mode = value;
	};

	get mode() {

		return this._mode;
	};

	get length() {

		return this._length;
	};

}


export default SpinalField



