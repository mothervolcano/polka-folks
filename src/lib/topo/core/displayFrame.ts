// import Layer from '../drawing/layer';
// import Rectangle from '../drawing/rectangle';
// import Point from '../drawing/point';

import { Point } from 'paper';


import { validatePointInput, validateSizeInput } from '../utils/converters'

/**
 * Abstract class representing a display frame.
 * @abstract
 */

abstract class DisplayFrame {

	public ID: string;
	protected _content: any;
	protected _position: any;
	private _tag: string;
	public isRendered: boolean;
	public isRemoved: boolean;
	private _size: any;
	private _ratio: number;
	private pins: any;


	/**
	* Validates the size input.
	* @param {any} input - The size input to validate.
	* @returns {any} The validated size input.
	* @private
	*/


	/**
	* Gets the X coordinate from a point.
	* @param {any} point - The point to get the X coordinate from.
	* @returns {number} The X coordinate.
	* @private
	*/

	private static getX(point: any): number {
    // TODO: Implement logic...
		return point[0];
	}


	/**
	* Gets the Y coordinate from a point.
	* @param {any} point - The point to get the Y coordinate from.
	* @returns {number} The Y coordinate.
	* @private
	*/

	private static getY(point: any): number {
    // TODO: Implement logic...
		return point[1];
	}


	/**
	* Gets the width from a size.
	* @param {any} size - The size to get the width from.
	* @returns {number} The width.
	* @private
	*/

	private static getWidth(size: any): number {
		// return this._content.bounds.width;
		return size[0];
	}


	/**
	* Gets the height from a size.
	* @param {any} size - The size to get the height from.
	* @returns {number} The height.
	* @private
	*/

	private static getHeight(size: any): number {
		// return this._content.bounds.height;
		return size[1];
	}


	/**
	* Creates an instance of DisplayFrame.
	* @param {any} position - The initial position of the display frame.
	* @param {any} size - The initial size of the display frame.
	*/

	constructor( position: any, size: any ) {

		this.ID = 'DisplayFrame';
		this._tag = 'NONE';
		this._position = validatePointInput( position );
		// this._position = position || [0, 0];
		this._size = validateSizeInput( size );
		this._ratio = 0// null;
		this._content = null;

		this.isRendered = false;
		this.isRemoved = false;

		this.pins = {

			CENTER: () => [this._content.bounds.center.x, this._content.bounds.center.y],
			BC: () => [this._content.bounds.bottomCenter.x, this._content.bounds.bottomCenter.y],
			BL: () => [this._content.bounds.bottomLeft.x, this._content.bounds.bottomLeft.y],
			TL: () => [this._content.bounds.topLeft.x, this._content.bounds.topLeft.y],
			TR: () => [this._content.bounds.topRight.x, this._content.bounds.topRight.y],
			BR: () => [this._content.bounds.bottomRight.x, this._content.bounds.bottomRight.y],
		};
	}


	/**
	* Updates the position of the display frame.
	* @param {any} input - The new position of the display frame.
	* @throws {Error} If the input type is incorrect.
	* @private
	*/

	private updatePosition(input: any) {

		const output = validatePointInput(input);

		if (output) {

			this._position = output;

		} else {

			throw new Error( "! ERROR@[DisplayFrame][position]: wrong input type" );
		}
	}


	/**
	* Updates the size of the display frame.
	* @param {any} input - The new size of the display frame.
	* @throws {Error} If the input type is incorrect.
	* @private
	*/

	private updateSize(input: any) {
		
		const output = validateSizeInput(input);

		if (output) {
			
			this._size = output;
			this._ratio = DisplayFrame.getWidth(this._size) / DisplayFrame.getHeight(this._size);

		} else {

			throw new Error("! ERROR@[DisplayFrame][size]: wrong input type");
		}
	}

  /**
   * Gets the layer of the display frame.
   * @returns {any} The layer.
   */
	get content() {
		return this._content;
	}

  /**
   * Sets the tag of the display frame.
   * @param {string} TAG - The tag to set.
   */
	set tag(TAG: string) {
		this._tag = TAG;
	}

  /**
   * Gets the tag of the display frame.
   * @returns {string} The tag.
   */
	get tag() {
		return this._tag;
	}


	/**
   * Gets the position of the display frame.
   * @returns {any} The position.
   */
	set position( input: any ) {

		this.placeAt( input, null );
	}


  /**
   * Gets the position of the display frame.
   * @returns {any} The position.
   */
	get position() {
		return this._position;
	}

  /**
   * Gets the X coordinate of the display frame's position.
   * @returns {number} The X coordinate.
   */
	get x() {
		return DisplayFrame.getX(this._position);
	}


	/**
	* Gets the Y coordinate of the display frame's position.
	* @returns {number} The Y coordinate.
	*/
	
	get y() {
		return DisplayFrame.getY(this._position);
	}


	/**
	* Sets the size of the display frame.
	* @param {any} input - The size to set.
	*/
	
	set size(input: any) {

		this.updateSize(input);
		this.render( null );
	}


	/**
	* Gets the size of the display frame.
	* @returns {any} The size.
	*/

	get size(): any {
		return this._size;
	}

	/**
	* Gets the width of the display frame.
	* @returns {number} The width.
	*/

	get width() {
		return DisplayFrame.getWidth(this._size);
	}

	/**
	* Gets the height of the display frame.
	* @returns {number} The height.
	*/

	get height() {
		return DisplayFrame.getHeight(this._size);
	}

  /**
   * Gets a pin point of the display frame with an optional offset.
   * @param {string} LABEL - The label of the pin point.
   * @param {any} offset - The optional offset from the pin point.
   * @returns {Point} The pin point.
   * @protected
   */

	protected getPin(LABEL: string, offset: any) {

		if (offset && validatePointInput(offset)) {

			const position = this.pins[LABEL]();

			return new Point(
			                 DisplayFrame.getX(position) + DisplayFrame.getX(offset),
			                 DisplayFrame.getY(position) + DisplayFrame.getY(offset)
			                 );

		} else {

			return this.pins[LABEL]();
		}
	}


  /**
   * Renders the display frame with the specified size.
   * @param {any} size - The size to render the display frame with.
   * @throws {Error} If no size is provided.
   */

	protected render( item: any ) {
		
		if ( item && !this.isRendered ) {

			this._content = item;

			this._content.visible = true;

			this.isRendered = true;

		} else {

			throw new Error( "! ERROR@[DisplayFrame][render]: there's nothing to render" );
		}
	}


  /**
   * Places the display frame at the specified position.
   * @param {any} position - The position to place the display frame at.

   */

	public placeAt( position: any, pivot: any ) {

		this.updatePosition( position );

		if ( pivot ) {

			this._content.pivot = validatePointInput( pivot );
		}

		this._content.position = this._position;

	}


  /**
   * Removes the display frame from the layer.
   */
	public remove() {

		if (this.isRendered && !this.isRemoved) {
			
			this._content.remove();
			this.isRemoved = true;
		}
	}

  /**
   * Updates the display frame.
   * @abstract
   */
	protected update() {};
}

export default DisplayFrame;



