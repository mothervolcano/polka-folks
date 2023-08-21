
import DisplayFrame from './displayFrame';


abstract class DisplayObject extends DisplayFrame {


	constructor( position: any, size: any ) {

		super( position, size );

		this.ID += '< DisplayObject';


	}

	public remove() {
		
		if ( this.isRemoved ) { throw new Error(`! ERROR @DisplayObject.remove(): object has been removed!`)}

		super.remove();

	}

}

export default DisplayObject