import DisplayObject from './displayObject';
import HyperPoint from './hyperPoint';
import { convertToHyperPoint } from '../utils/converters';

abstract class AttractorObject extends DisplayObject {


	// private _dimension: number // Required when Topo types will be finished
	protected _orientation: number;
	protected _polarity: number;

	protected _path: any;
	protected _anchor: any;

	protected _radius: any;

	public axisAngle: number;
	
	// STATES. Set at creation time and meant to preserve original settings during transformations and redrawing.
	// The default is for the fields to organically adjust the attractors. These state properties allow to 
	// designate attractors to ignore the settings coming from the parent field.
	
	public isDisabled: boolean;
	public isSelfAnchored: boolean;
	public isAxisLocked: boolean;


	constructor( position: any, size: any ) {

		super( position, size );

		this.ID += `< AttractorObject`;

		// this._dimension = null;
		this._orientation = 1;
		this._polarity = 1;

		const anchor = new HyperPoint( position, null, null );
		anchor.spin = 1;

		this._anchor = anchor;

		this._radius = null; // The radius value will depend on the type of attractor eg. Orbital, Spine and therefore it is defined by the subclass.

		this.axisAngle = 0;
		this.isDisabled = false;
		this.isAxisLocked = false;
		this.isSelfAnchored = false;

	};

	protected calculateLocation( pt: any ): any {};
	protected adjustToOrientation( value: number ): any {};
	protected adjustToPolarity( value: number ): any {};


	set orientation( value: number ) {

		if ( value !== this._orientation ) {

			this._orientation = value;
			this.adjustToOrientation( value );
		}
	};


	get orientation() {

		return this._orientation;
	};


	set polarity( value: number ) {

		this._polarity = value;
		this.adjustToPolarity( value );
		// this.scale( 1, this._polarity );
	};


	get polarity() {

		return this._polarity;
	};


	// anchor is set when the attractor is placed in a field

	set anchor( value: any ) {

		console.log(`!ERROR @${this.ID}: Anchor cannot be set directly. Attractor must be placed in and by a Field to be assigned an anchor`);

		// this._anchor = value;
	};


	get anchor() {

		return this._anchor;
	};


	get path() {

		return this._path;
	};

	get center() {

		return convertToHyperPoint( this._path.bounds.center );
	};

	set radius( value: number ) {

		this._radius = value;
	}

	get radius() {

		return this._radius;
	}

	get length() {

		return this._path.length;
	};


	public getPath(): any {

		return this._path.clone();
	};


	// at is provided by attractors that have paths that are non-linear ie. the input location doesn't match the mapped location.
	private createAnchor({
	    point,
	    tangent,
	    normal,
	    curveLength,
	    pathLength,
	    at,

	}: {

	    point: any;
	    tangent: any; 
	    normal: any; 
	    curveLength: number;
	    pathLength: number; 
	    at: number; 

	}) {
		
		const factor = [0, 0.25, 0.50, 0.75 ].includes(at) ? 1/3 : curveLength/pathLength;

		const hIn = tangent.multiply( curveLength * factor ).multiply( -1 );
		const hOut = tangent.multiply( curveLength * factor );		

		// const hIn = tangent.multiply( curveLength * 2/6 ).multiply( -1 );
		// const hOut = tangent.multiply( curveLength * 2/6);

		const anchor = new HyperPoint( point, hIn, hOut );

		anchor.position = at;
		anchor.tangent = tangent.multiply(this._orientation); // HACK: because the path is flipped using scale() the vectors need to be inverted
		anchor.normal = normal.multiply(this._orientation);
		anchor.spin = this._orientation;
		anchor.polarity = this._polarity;

		return anchor;
	};


	public anchorAt( anchor: HyperPoint, along: string = 'RAY') {

		this._anchor = anchor;
		this._anchor.spin = this._orientation;

		if ( !this.isAxisLocked ) {

			if ( along === 'TAN' ) {

				this._content.rotation = anchor.tangent.angle;

			} else {

				this._content.rotation = anchor.normal.angle;
			}	
		}
		
		this.rotate( this.axisAngle );
		this.placeAt( this._anchor.point, this._path.position );

	};


	public extractPath( A: any, B: any ): any {

		let P1;
		let P2;

		if ( A.point ) {

			P1 = this._path.getNearestLocation( A.point ).point;
		}

		if ( typeof A === 'number' ) {

			P1 = this.calculateLocation( A ).point;
		}


		if ( B.point ) {

			P2 = this._path.getNearestLocation( B.point ).point;
		}

		if ( typeof B === 'number' ) {

			P2 = this.calculateLocation( B ).point;
		}


		const extractedPath = this._path.clone()

		extractedPath.splitAt( extractedPath.getNearestLocation( P1 ) )
		let discardedPath = extractedPath.splitAt( extractedPath.getNearestLocation( P2 ) )

		extractedPath.strokeColor = 'red';
		extractedPath.strokeWidth = 5;

		discardedPath.remove();

		return extractedPath;

	};


	public locate( position: any, orient: boolean = false  ): any { // TODO: cast type

		const curveLocation = this.calculateLocation( position );

		if ( curveLocation ) {

			const pt = this.createAnchor( curveLocation );

			if ( orient && this._orientation === -1 ) { return pt.flip() } 

			return pt;

		} else {

			console.log(`! ERROR @ ${this.ID}.locate() : Unable to locate the position`)

			return null
		}
	}

	public locateFirstIntersection( item: any, orient: boolean = false ): any { // TODO: returns a hyperpoint

		if ( item instanceof AttractorObject ) {

			const intersections = this._path.getIntersections( item.getPath() );

			if ( intersections.length > 0 ) {

				const curveLocation = intersections[0];

				const pt = this.createAnchor( {   

					point: curveLocation.point, 
					tangent: curveLocation.tangent, 
					normal: curveLocation.normal, 
					curveLength: curveLocation.curve.length, 
					pathLength: curveLocation.path.length, 
					at: curveLocation.offset / curveLocation.path.length

				});

				if ( orient && this._orientation === -1 ) { return pt.flip() }

				return pt;
			}
		}
	}

	public locateLastIntersection( item: any, orient: boolean = false ): any {

		if ( item instanceof AttractorObject ) {

			const intersections = this._path.getIntersections( item.getPath() );

			if ( intersections.length > 0 ) {

				const curveLocation = intersections.slice(-1)[0];

				const pt = this.createAnchor({

					point: curveLocation.point, 
					tangent: curveLocation.tangent, 
					normal: curveLocation.normal, 
					curveLength: curveLocation.curve.length, 
					pathLength: curveLocation.path.length, 
					at: curveLocation.offset / curveLocation.path.length
				})

				if ( orient && this._orientation === -1 ) { return pt.flip() }

				return pt;
			}
		}
	};


	// public locateAllIntersections( item: any ): any[] {

	// 	// TODO
	// };



	public moveBy( by: number, along: any ) {

		this._anchor.offsetBy( by, along );

		this.placeAt( this._anchor.point, null );

		return this;
	};


	public reverse() {

		this._content.reverse();

		return this;		
	};


	public scale( hor: number, ver: number ): any {

		this._content.scale( hor, ver );
		this._radius = this._content.bounds.width;

		return this;
	};

	public skew( vector: any ): any {

		// this._path.scale( hor, ver )
		this._content.shear( vector, this._path.position );

		return this;	
	};


	public rotate( angle: number ) {

		if ( !this.isAxisLocked ) {

			this._content.rotate( angle, this._anchor.point );
			this.axisAngle += angle;
		}
	};


	public reset() {
		
		this.remove();
		this.render( null );
	};


	public remove() {

		if ( this.isRendered ) {

			this._content.remove();
		}
	};

}


export default AttractorObject


