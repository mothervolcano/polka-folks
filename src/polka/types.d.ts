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
  plot( params: any, ...args: any[] ): void;

}

export interface ModelConfig {

	type?: string;
  order?: string;
	create: (field:any, radius: number) => IModel; //TODO finish: f can be an AttractorField or AttractorObject
	use: IModel | null; //TODO the type is a model
	base: string | IModel | null;
	size: string | number;
	settings: any[];
	params: any[];
	compats: ModelConfig[];
}