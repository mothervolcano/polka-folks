import { IAttractor, IAttractorObject } from "../lib/topo/types";

export type MetricScaleType = "PHI" | "SIN";
export type MetricUnitType = "XXS" | "XS" | "S" | "M" | "L" | "XL";

export interface MetricUnit {
  scale: MetricScaleType;
  unit: MetricUnitType;
}

export interface MetricScale {
  BASE: number,
  XXS: number;
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
}

export interface IOrbitalField extends IAttractor {

  
}

export interface IModel {

  // readonly field: IAttractorField;
  readonly base: IModel;
  readonly attractor: IAttractor;

  A: IHyperPoint;
  B: IHyperPoint;
  C: IHyperPoint;
  T: IHyperPoint;
  name: string;
  PHI: any;
  SIN: any;
  // baseOn( base: IModel ): void; // DEPRECATE
  // attractor: IAttractor;
  level: any; // It's a Paper.Layer at the moment. Change when there is a replacement;
  path: any;
  // radius: number;
  getAtt( LABEL: string ): any;
  getPin( LABEL: string ): any;
  setAttractor( att?: IAttractor ): void;
  setLevel(value: number): void;
  setScale( baseValue: number ): void;
  configure( ...args: any[] ): void;
  plot( params: any, ...args: any[] ): any;

}

export interface ShapeProps {
  width?: number;
  height?: number;
  radius?: number;
}

export interface IShape {

  draw(field: IAttractor & IAttractorObject, props: ShapeProps);
}

export interface ModelConfig {

	type: string;
  order?: string;
	create: (field:any, type: string) => IModel; //TODO finish: f can be an AttractorField or AttractorObject
	use: IModel | null; //TODO the type is a model
	base: string | IModel | null;
	size: MetricUnit | number;
  level: number;
	settings: any[];
	params: any[];
	compats: ModelConfig[];
}