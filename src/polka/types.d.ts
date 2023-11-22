import { IAttractor, IAttractorObject } from "../lib/topo/types";

export type MetricScaleType = "PHI" | "SIN";
export type MetricUnitType = "XXS" | "XS" | "S" | "M" | "L" | "XL";

export interface MetricUnit {
  scale: MetricScaleType;
  unit: MetricUnitType;
}

export interface MetricScale {
  XXS: number;
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
}

export interface IModel {

  readonly field: IAttractorField;
  readonly base: IModel;

  A: IHyperPoint;
  B: IHyperPoint;
  C: IHyperPoint;
  T: IHyperPoint;
  baseOn( base: IModel ): void;
  level: any; // It's a Paper.Layer at the moment. Change when there is a replacement;
  path: any;
  radius: number;
  getAtt( LABEL: string );
  getPin( LABEL: string );
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

	type?: string;
  order?: string;
	create: (field:any, radius: number) => IModel; //TODO finish: f can be an AttractorField or AttractorObject
	use: IModel | null; //TODO the type is a model
	base: string | IModel | null;
	size: MetricUnit | number;
  level: number;
	settings: any[];
	params: any[];
	compats: ModelConfig[];
}