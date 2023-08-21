// const _ = require('lodash');

import { DisplayFrameType } from '../types'
import DisplayFrame from './displayFrame';


abstract class DisplayNode extends DisplayFrame {

	
	private children: Array<any>

	
	constructor( position: any, size: any ) {

		super( position, size );

		this.ID += '< DisplayNode';

		this.children = [];

	}


	public add( child: any ): void {

		this.children.push( child );
	}


	public addMany( newChildren: Array<any> ): void {

		this.children = [  ...this.children, ...newChildren ];
	} 


	public hasChildren(): boolean {

		return this.children.length > 0;
	}


	public getChild( i: number ): any {

		if ( this.children[i] ) {

			if ( this.children[i].isRemoved ) { throw new Error(`! ERROR @ ${this.ID}.render: ${this.children[i].ID} at ${i} has been removed!`) }

			return this.children[i];

		} else {

			throw new Error(`! ERROR @ ${this.ID}.getChild(): no children found at index ${i}. Total num of children is: ${this.children.length}`);
		}
	}



	public getLastChild(): any {

		return this.children[ this.children.length-1 ];
	}



	public getFirstChild(): any {

		return this.children[0];

	}


	public getChildren(): Array<any> {

		return this.children.slice();
		// return this.children;

	}


	public clear() {

		this.children.forEach( ( c, i ) => {

			// console.log(` ! WARNING: @ ${this.ID}.clear(): removing ${c.ID}`);

			c.remove();

		});

		this.children = [];		
	}


	public remove() {

		if ( this.isRemoved ) { throw new Error(`! ERROR @DisplayNode.remove: object has been removed!`)}
		
		this.clear();
		super.remove();
	}


}

export default DisplayNode;