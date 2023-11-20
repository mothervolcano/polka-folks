import { OrientationType, PolarityType, IHyperPoint, PointLike, SizeLike } from '../../lib/topo/types';
import { validatePointInput, validateSizeInput } from '../../lib/topo/utils/converters'

import AttractorField from '../../lib/topo/core/attractorField';
import Eclipse from './eclipse';
import HyperPoint from '../../lib/topo/core/hyperPoint';



class EclipseField extends AttractorField {

	
	private threshold: number;
	

	constructor( position: IHyperPoint | null, size: SizeLike | number ) {

		super( validatePointInput(position), validateSizeInput(size) )

		this.threshold = 0.5;

		this.render();

		return this;
	};


	protected render() {

		if ( this.isRendered ) {

			this._content.remove();
			this.isRendered = false;
		}

		this._attractor = new Eclipse( this.size, this.position, this.threshold );
		this._attractor.orientation = 1;
		this._attractor.polarity = 1;
		
		this._attractor.getPath().strokeColor = '#FFE44F';

		this.arrangeAttractors( this.filterAttractors() );

		// super.render( this._attractor._content );
		super.render( this._attractor.path );

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

	};


	public envelop( value: number ) {

		this.threshold = value;

		this.render();
	};
}


export default EclipseField;



