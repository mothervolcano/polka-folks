import { OrientationType, PolarityType, IAttractor, IAttractorObject, IHyperPoint, VectorDirection, PointLike, SizeLike } from '../types';

import DisplayNode from './displayNode';
import AttractorObject from './attractorObject';
import HyperPoint from './hyperPoint';


abstract class AttractorField extends DisplayNode {


	protected _attractor: IAttractor & IAttractorObject | undefined;

	private _span: Array<number>;
	private _shift: number;
	
	private _axisAngle: number;

	public isDisabled: boolean;
	public isSelfAnchored: boolean;
	public isAxisLocked: boolean;
	

	constructor(  position: PointLike, size: SizeLike ) {

		super( position, size )

		this._axisAngle = 0;

		this._span = [ 0, 1 ];
		this._shift = 0;


		this.isDisabled = false;
		this.isAxisLocked = false;
		this.isSelfAnchored = false;

	}	

	get attractor() {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };

		return this._attractor;
	}

	get anchor() {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };

		return this._attractor?.anchor;
		
	};

	get attractors() {

		return this.getChildren();
	}

	get firstAttractor() {

		return this.getFirstChild();
	}

	get lastAttractor() {

		return this.getLastChild();
	}

	set orientation( value: OrientationType ) {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };

		this._attractor.orientation = value;
	}

	get orientation() {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };

		return this._attractor.orientation;
	}

	set polarity( value: PolarityType ) {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };
		this._attractor.polarity = value;
	}

	get polarity() {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };
		return this._attractor.polarity;
	}

	set axisAngle( value: number ) {

		this._axisAngle = value;
	}


	get axisAngle() {

		return this._axisAngle;
	}

	// MUST BE IMPLEMENTED BY THE SUBCLASSES
	protected configureAttractor( att: IAttractor, anchor: IHyperPoint ) {}


	protected filterAttractors() {

		const attractors = this.getChildren()
			.filter( att => !att.isDisabled && !att.isSelfAnchored );

		return attractors;
	}


	protected arrangeAttractors( attractors: Array<IAttractor>, pTest: boolean = false ) {


		if ( !this._attractor ) { throw new Error('AttractorField has no base attractor'); }


		const start = this._span[0]
		const end = this._span[1]

		const span = end - start

		let len = !this._attractor.path.closed || pTest ? attractors.length-1 : attractors.length;


		const step = span / ( Math.max( len, 1 ));

		for ( let i = 0; i < attractors.length; i++ ) {

			const attractor = attractors[i]

			const position = ( this._shift + start + step*i ) > 1  ? ( this._shift + start + step*i ) - 1 : ( this._shift + start + step*i );

			const anchor = attractor.isSelfAnchored ? this._attractor.locate( attractor.anchor.position ) : this._attractor.locate( position );

			attractor.reset();

			this.configureAttractor( attractor, anchor );

			attractor.anchorAt( anchor );
		
		} 
	};


	public getAttractor( i?: number ) {

		if ( typeof i === 'number' ) {

			return this.getChild( i );

		} else {

			return this._attractor;
		}
	};


	public locate( at: number, orient: boolean = false ): any {

		const attractors = this.filterAttractors();
		const anchors = attractors
		  .filter( att => !att.isToSkip )
		  .map( att => att.locate( at, orient ) );

		// return _.flatten( anchors );
		return anchors.flat();

	}

	// -------------------------------------------------------
	// locate on a specified attractor

	public locateOn( attractor: IAttractor | number, at: number, orient: boolean = false ) {

		
		if ( attractor instanceof AttractorObject ) {

			return attractor.locate( at )

		} else if ( typeof attractor === 'number' ) {

			return this.getChild( attractor ).locate( at, orient );
		}
	};


	public addAttractor( attractor: IAttractor, at?: number ): void {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };

		this.add( attractor );

		// if ( attractor._dimension === null )  { attractor._dimension = this.getChildren().length }

		// ------------------------------------------------------------
		// 	

		if ( typeof at === 'number' ) {

			const anchor = this._attractor.locate( at );

			attractor.reset()
			attractor.isSelfAnchored = true;

			this.configureAttractor( attractor, anchor );
			attractor.anchorAt( anchor );
			
	
		// ------------------------------------------------------------
		// 

		} else {

			this.arrangeAttractors( this.filterAttractors() );
		}
	}

	public addAttractors( attractors: Array<IAttractor> ) {

		this.addMany( attractors );

		this.arrangeAttractors( attractors );
	}



	public anchorAt( anchor: HyperPoint, along: VectorDirection = 'RAY' ) {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };

		this._attractor.anchorAt( anchor, along );

		this.arrangeAttractors( this.filterAttractors() );
	};


	public placeAt( position: any, pivot: any ): void {

		// const iPos = this.position;

		super.placeAt( position, pivot );

		this.arrangeAttractors( this.filterAttractors() );

		// for ( const att of this.getChildren() ) {

		// 	const pos = att.position.add( this.position.subtract(iPos) )

		// 	att.placeAt( pos )
		// }
	};


	public moveBy( by: number, along: any ) {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };

		this._attractor.anchor.offsetBy( by, along );

		this.placeAt( this._attractor.anchor.point, null );

		return this;
	};

	
	public scale( hor: number, ver: number, scaleField: boolean = false ): any {

		if ( scaleField ) {

			// TODO

		} else {

			for ( const att of this.filterAttractors() ) {

				att.scale( hor, ver );
				att.rotate( att.anchor.normal.angle );
			}
		}

		return this;
	};


	// Rotates the node together with its childs

	public rotate( angle: number ) {

		if ( !this._attractor ) { throw new Error('Attractor Field has no defined base attractor') };

		// if ( !this._attractor.isAxisLocked ) {

		// 	this._attractor._content.rotate( angle, this._attractor._anchor.point );
		// 	this._attractor.axisAngle += angle;
		// }

		this._attractor.rotate( angle );

		// const group = new Group();

		// group.addChild( this._content );

		// for ( const att of this.getChildren() ) {

		// 	group.addChild( att._content )
		// }

		// group.pivot = this._content.position;

		// group.rotate( angle )	
	}

	// Rotates the childs around the node

	public revolve( angle: number ) {

		const delta = angle; // TODO angles need to be normalized to 0... 1

		this._shift = delta;

		this.arrangeAttractors( this.filterAttractors() );

		return this;

	}

	public spin( angle: number ) {

		for ( const att of this.filterAttractors() ) {

			att.rotate( angle * att.orientation );
		}

		return this;
	}


	public fold( amount: any, alignAxis: boolean = true ) {

		// const start = this._span[0];
		// const end = this._span[1];		

		const start = this._span[0];
		const end = this._span[1];

		let factor = this.filterAttractors().length === 2 ? 3 : this.filterAttractors().length === 3 ? 2 : 1.5;

		if ( amount >= 0 ) {

			this._span = [ start+amount, end-amount*factor ];

		} else {

			this._span = [ end+amount, start-amount*factor ];
		}

		const attractors = this.filterAttractors().map( (att) => { att.isAxisLocked=!alignAxis; return att } );

		this.arrangeAttractors( attractors, true );

		return this;
	}



	public compress( start: any, end: any, alignAxis: boolean = true ) {

		this._span = [ start, end ];

		const attractors = this.filterAttractors().map( (att) => { att.isAxisLocked=!alignAxis; return att } );

		this.arrangeAttractors( attractors, true );

		return this;
	}


	public expandBy( by: any, along: string ) {

		for ( const att of this.filterAttractors() ) {

			att.moveBy( by, along );
		}

		return this;
	}

	public reset(): void {


		for ( const att of this.getChildren() ) {

			att.reset();
		}

		if ( this._attractor ) { this._attractor.reset() };
		this.render( null );
	}


	public remove(): void { 

		if ( this._attractor ) { this._attractor.remove() };
		super.clear();
	}
 
}


export default AttractorField;


