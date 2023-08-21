// import Layer from '../drawing/layer';

import AttractorNode from '../../lib/topo/core/attractorNode';
import Orbital from './orbital';
import HyperPoint from '../../lib/topo/core/hyperPoint';

import DebugDot from '../../lib/topo/utils/debugDot';


class OrbitalField extends AttractorNode {


	constructor( position: any, radius: number | number[], orientation: number = 1, polarity: number = 1 ) {

		super( position, radius, orientation, polarity )
		
		this.ID += `< OrbitalField`;

		// this._TEMP_size = size;

		this.render();

		return this;

	}

	protected render() {

		if ( this.isRendered ) {

			this._content.remove();
			this.isRendered = false;
		}

		this._attractor = new Orbital( this.position, this.size );
		this._attractor.orientation = this._orientation;
		this._attractor.polarity = this._polarity;

		this._attractor.getPath().strokeColor = '#FFE44F';

		this.arrangeAttractors( this.filterAttractors() );

		super.render( this._attractor._content );

	}

	protected adjustRotationToPosition( position: number ) {

		if ( position > 0.25 && position < 0.75 ) {

			return 0;

		} else {

			return -180;
		}
	};


	protected calculateOrientation( i: number, anchor: HyperPoint ) {

		if ( anchor.position > 0.25 && anchor.position < 0.75 ) {

			return -1;

		} else {

			return 1;
		}

	};


	protected calculatePolarity( i: number, anchor: HyperPoint ) {

		return this.polarity;
		
	};


	protected calculateRotation( att: any, anchor: HyperPoint ) {

		// if ( anchor.position > 0.25 && anchor.position < 0.75 ) {

		// 	// axisAngle = anchor.normal.angle;
		// 	axisAngle = 0;

		// } else {

		// 	// axisAngle = anchor.normal.angle-180;
		// 	axisAngle = -180;
		// }

		return att.adjustRotationToPosition( anchor.position );
	}
}

export default OrbitalField

