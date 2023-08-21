import { Path, Group } from 'paper';

import { PathLocationData, UnitIntervalNumber, IHyperPoint, PointLike, SizeLike } from '../../lib/topo/types';
import { validateSizeInput} from '../../lib/topo/utils/converters'

import AttractorObject from '../../lib/topo/core/attractorObject'
import HyperPoint from '../../lib/topo/core/hyperPoint'
import Orbital from './orbital'

import { markPoint } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class Eclipse extends AttractorObject {

	private _debugPath1: any
	private _debugPath2: any
	private _debugPath3: any
	private _debugPath4: any
	private _arrow: any;
	
	private threshold: number;
	private scaleTicks: Array<number> | null

	constructor( size: SizeLike | number, position: PointLike = {x:0, y:0}, threshold: number = 0.5 ) {

		super( validateSizeInput(size), position );

		this.threshold = threshold;

		this.scaleTicks = null;

		this._debugPath1 = new Path()
		this._debugPath2 = new Path()
		this._debugPath3 = new Path()
		this._debugPath4 = new Path()

		this._arrow = new Group()

		this.render();

		return this;

	}

	protected adjustRotationToPosition( position: number ) {

		if ( position > 0.25 && position < 0.75 ) {

			return 0;

		} else {

			return -180;
		}
	};

	protected adjustToOrientation( value: number ) {

		this.scale( value, 1 );
	}

	protected adjustToPolarity( value: number ) {

		// this.scale( 1, value );
	}


	protected render() {


		if ( this.isRendered ) {

			this._content.remove();
			this.isRendered = false;
		}

		const guide = new Orbital( this.size, this.position );


		const _A = guide.locate( 0.25 - 0.25*this.threshold );
		const _B = guide.locate( 0.25 + 0.25*this.threshold );
		const _C1 = guide.locate( 0.25 );
		const _C2 = guide.locate( 0.75 );

		const r = this.size[0];
		// const d = r/8 * this.p3;

		// const a = 90 * d/r * this.threshold;

		// _A.offsetBy( d*-1, 'RAY').steer( -a, 180, this.threshold )
		// _B.offsetBy( d*-1, 'RAY').steer( a, 180, this.threshold )
		
		_A.steer( 0, 180, this.threshold ).scaleHandles( 1+1/3, 1, 0 );
		_B.steer( 0, 180, this.threshold ).scaleHandles( 1+1/3, 0, 1 );

		// _A.offsetBy( d * (1-this.threshold), 'VER');

		_C1.steer( 0, 180, this.threshold )
		_C2.offsetBy( r*(2)*(1-this.threshold)*-1, 'RAY')//.steer( 0, 180, this.threshold*1.5 )

		const A = _A.getSegment();
		const B = _B.getSegment();

		const C1 = _C1.getSegment()
		const C2 = _C2.getSegment()

		this._path = new Path({

			segments: [ A, C1, B, C2 ],
			strokeColor: '#00A5E0',
			closed: true
		});


		const len = this._path.length;

		const _P0 = this._path.segments[0].location;
		const _P1 = this._path.segments[1].location;
		const _P2 = this._path.segments[2].location;
		const _P3 = this._path.segments[3].location;

		this.scaleTicks = [ 0, _P1.offset/len, _P2.offset/len, _P3.offset/len, 1 ];
		
		this.addOrientationArrow()

		super.render( new Group( [ this._path, this._arrow ] ) );

		guide.remove();

	}



	protected getPathLocationDataAt( at: number ): PathLocationData { // TODO: cast type

		const _at = this.mapToNonLinearScale( at, this.scaleTicks );

		const loc = this._path.getLocationAt( this._path.length * _at );

		return { point: loc.point, tangent: loc.tangent, normal: loc.normal, curveLength: loc.curve.length, pathLength: loc.path.length, at: at };
	}


	private mapToNonLinearScale( value: number, nonLinearScaleValues: number[] ): number {
	  
	  const linearScale = [0, 0.25, 0.50, 0.75, 1];
	  const index = Math.floor(value * (linearScale.length - 1));
	  const lowerValue = linearScale[index];
	  const upperValue = linearScale[index + 1];
	  const ratio = (value - lowerValue) / (upperValue - lowerValue);
	  const lowerNonLinearValue = nonLinearScaleValues[index];
	  const upperNonLinearValue = nonLinearScaleValues[index + 1];
	  const mappedValue = lowerNonLinearValue + ratio * (upperNonLinearValue - lowerNonLinearValue);
	  
	  return mappedValue;

	}
	


	private addOrientationArrow() {

		this._debugPath1.remove()
		this._debugPath2.remove()
		this._debugPath3.remove()
		this._debugPath4.remove()

		this._arrow.remove()

		this._arrow = new Group()

		this._debugPath1 = new Path({ segments: [ this._path.segments[0], this._path.segments[1] ], strokeColor: '#70D9FF' })
		
		let _A = this._debugPath1.lastSegment.point.subtract( this._debugPath1.lastSegment.location.tangent.multiply(5) )
		let _Ar = _A.rotate( 30, this._debugPath1.lastSegment.point )
		
		let _B = this._debugPath1.lastSegment.point.subtract( this._debugPath1.lastSegment.location.tangent.multiply(5) )
		let _Br = _B.rotate( -40, this._debugPath1.lastSegment.point )

		this._debugPath2 = new Path( {
		                            segments: [ this._debugPath1.lastSegment.point, _Ar ],
		                            strokeColor: '#70D9FF' })
		
		this._debugPath3 = new Path( {
		                            segments: [ this._debugPath1.lastSegment.point, _Br ],
		                            strokeColor: '#70D9FF' })

		this._debugPath4 = new Path.Circle({center: this._debugPath1.firstSegment.point, radius: 2, fillColor: '#70D9FF'})
	

		this._arrow.addChild(this._debugPath1)
		this._arrow.addChild(this._debugPath2)
		this._arrow.addChild(this._debugPath3)
		this._arrow.addChild(this._debugPath4)
	}
}


export default Eclipse;


