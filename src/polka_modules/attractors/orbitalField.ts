import { IHyperPoint, PointLike, SizeLike } from '../../lib/topo/types';

import { validatePointInput, validateSizeInput } from '../../lib/topo/utils/converters'
import AttractorField from '../../lib/topo/core/attractorField';
import Orbital from './orbital';

import DebugDot from '../../lib/topo/utils/debugDot';


class OrbitalField extends AttractorField {


	constructor( position: IHyperPoint | null, radius: SizeLike | number, orientation: number = 1, polarity: number = 1 ) {

		super( validatePointInput(position), validateSizeInput(radius), orientation, polarity );

		this.render();

		return this;
	}

	protected render() {

		if ( this.isRendered ) {

			this._content.remove();
			this.isRendered = false;
		}

		this._attractor = new Orbital( this.size, this.position );
		this._attractor.orientation = this._orientation;
		this._attractor.polarity = this._polarity;

		this._attractor.getPath().strokeColor = '#FFE44F';

		this.arrangeAttractors( this.filterAttractors() );

		super.render( this._attractor._content );

	};


	protected adjustRotationToPosition( anchor: any, isPositive: Function, isNegative: Function ) {

		this._attractor.adjustRotationToPosition( anchor, isPositive, isNegative  );
	};

	protected adjustToOrientation( anchor: any, isPositive: Function, isNegative: Function ) {

		this._attractor.adjustToOrientation( anchor, isPositive, isNegative );
	};

	protected adjustToPolarity( anchor: any ) {

		this._attractor.adjustToPolarity( anchor );
	};



	protected configureAttractor( att: any, anchor: IHyperPoint ) {

		att.adjustRotationToPosition( 
            anchor,
            (pos:number) => { return pos < 0.25 || pos > 0.75 }, // the condition of this field for the orientation to be 1
            (pos:number) => { return pos >= 0.25 && pos <= 0.75 }, // the condition of this field for the orientation to be -1
		);
		
		att.adjustToOrientation( 
            anchor,
            (pos:number) => { return pos < 0.25 || pos > 0.75 }, // the condition of this field for the orientation to be 1
            (pos:number) => { return pos >= 0.25 && pos <= 0.75 }, // the condition of this field for the orientation to be -1
		);

		att.adjustToPolarity( anchor );

	}


	// protected calculateOrientation( att: any, anchor: IHyperPoint ) {

	// 	att.adjustToOrientation( anchor );

	// };


	// protected calculatePolarity( att: any, anchor: IHyperPoint ) {

	// 	att.adjustToPolarity( anchor );
		
	// };


	// protected calculateRotation( att: any, anchor: IHyperPoint ) {

	// 	att.adjustRotationToPosition( anchor.position );
	// }
}

export default OrbitalField

