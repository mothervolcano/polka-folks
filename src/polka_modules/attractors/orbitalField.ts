import { OrientationType, PolarityType, IHyperPoint, IAttractor, PointLike, SizeLike } from '../../lib/topo/types';

import { validatePointInput, validateSizeInput } from '../../lib/topo/utils/converters'
import AttractorField from '../../lib/topo/core/attractorField';
import Orbital from './orbital';


class OrbitalField extends AttractorField {


	constructor( position: IHyperPoint | null, radius: SizeLike | number ) {

		super( validatePointInput(position), validateSizeInput(radius) );

		this.render();

		return this;
	}

	protected render() {

		if ( this.isRendered ) {

			this._content.remove();
			this.isRendered = false;
		}

		this._attractor = new Orbital( this.size, this.position );
		this._attractor.orientation = 1;
		this._attractor.polarity = 1;

		this._attractor.getPath().strokeColor = '#FFE44F';

		this.arrangeAttractors( this.filterAttractors() );

		// super.render( this._attractor._content );
		super.render( this._attractor.path );

	};


	public adjustRotationToPosition( anchor: IHyperPoint, isPositive: Function, isNegative: Function ) {

		if ( !this._attractor ) { throw new Error('Orbital Field has no defined base attractor') };

		this._attractor.adjustRotationToPosition( anchor, isPositive, isNegative  );
	};

	public adjustToOrientation( anchor: IHyperPoint, isPositive: Function, isNegative: Function ) {

		if ( !this._attractor ) { throw new Error('Orbital Field has no defined base attractor') };

		this._attractor.adjustToOrientation( anchor, isPositive, isNegative );
	};

	public adjustToPolarity( anchor: IHyperPoint ) {

		if ( !this._attractor ) { throw new Error('Orbital Field has no defined base attractor') };

		this._attractor.adjustToPolarity( anchor );
	};



	protected configureAttractor( att: IAttractor, anchor: IHyperPoint ) {

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

