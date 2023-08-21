import { Point, Segment } from 'paper';

export interface DisplayObjectType {

  ID: string;
  position: any;
  size: any;
  tag: string;
  layer: any;
  // Add more properties as needed
  // ...
  remove(): void;
  placeAt(position: any, anchor: any): void;
  moveBy(vector: any, distance: number): void;
  // Add more methods as needed
  // ...
}


export interface HyperPoint {
  
  readonly ID: string;
  readonly x: number;
  readonly y: number;
  readonly point: typeof Point;
  tangent: typeof Point | null;
  normal: typeof Point | null;
  spin: number;

  getSegment(withInHandle?: boolean | 0 | 1, withOutHandle?: boolean | 0 | 1): typeof Segment;
  offsetBy(by: number, along: string): HyperPoint;
  steer(tilt: number, aperture: number): HyperPoint;
  
}