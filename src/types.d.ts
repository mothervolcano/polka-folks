export interface Param {
  id: string;
  name: string;
  type?: "SLIDER" | "VALUE" | "OPTIONS" | "TEXT" | "CHIPS";
  value?: number | string | number[] | string[];
  label: string;
  rank?: number;
  range?: [number, number];
  step?: number;
  options?: {label: string, value: string}[];
}

export type ParamSet = Array<Param>;

export interface Model {
  option: string;
  label: string;
  icon: any;
  model: any;
  console: any;
  params: ParamSet;
  default: boolean;
  checked: boolean;
}

export interface Archetype {
  option: string;
  label: string;
  icon: any;
  models: any;
  polka: any;
  console: any;
  baseParams: ParamSet;
  params: ParamSet;
  default: boolean;
  checked: boolean;
}