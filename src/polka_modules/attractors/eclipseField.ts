import AttractorField from '../../lib/topo/core/attractorField';
import Eclipse from './eclipse';
import HyperPoint from '../../lib/topo/core/hyperPoint';



class EclipseField extends AttractorField {

	
	private threshold: number;

	constructor( position: any, size: any, orientation: number = 1, polarity: number = 1 ) {

		super( position, size, orientation, polarity )
		
		this.ID += `< OrbitalField`;

		this.threshold = 0.5;

		this.render();

		return this;
	}


	protected render() {

		if ( this.isRendered ) {

			this._content.remove();
			this.isRendered = false;
		}

		this._attractor = new Eclipse( this.size, this.position, this.threshold )
		this._attractor.orientation = this.orientation;
		this._attractor.polarity = this.polarity;
		
		this._attractor.getPath().strokeColor = '#FFE44F';

		this.arrangeAttractors( this.filterAttractors() );

		super.render( this._attractor._content );

	}


	protected calculateOrientation( i: number, anchor: HyperPoint ) {

		if ( anchor.position > 0.25 && anchor.position < 0.75 ) {

			return -1;

		} else {

			return 1;
		}
	}
	

	protected calculatePolarity( i: number, anchor: HyperPoint ) {

		return this.polarity;
	}


	protected calculateRotation( i: number, anchor: HyperPoint ) {

		let axisAngle = 0

		if ( anchor.position > 0.25 && anchor.position < 0.75 ) {

			axisAngle = 0;

		} else {

			axisAngle = -180;
		}

		return axisAngle;
	}


	public envelop( value: number ) {

		this.threshold = value;

		this.render();
	}
}


export default EclipseField;



