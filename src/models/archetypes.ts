import { Model, ParamSet } from "../types";

import Nerd from "../polka/archetypes/nerd";
import Punk from "../polka/archetypes/punk";
import Baroque from "../polka/archetypes/baroque";
import BaroqueConsole from "../components/consoles/baroqueConsole";
import NerdConsole from "../components/consoles/nerdConsole";
import PunkConsole from "../components/consoles/punkConsole";


const nerdParamsSchema: ParamSet = [
  {
    id: "ogp1",
    name: "splitLat",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "Split Drop",
  },
  {
    id: "ogp2",
    name: "splitAperture",
    value: 0.5,
    range: [0, 2],
    step: 0.01,
    label: "Split Aperture",
  },
  { id: "ogp3", name: "", value: 1, range: [0, 2], step: 1, label: "Olga P3" },
  {
    id: "ogp4",
    name: "",
    value: 0.5,
    range: [0, 2],
    step: 1,
    label: "Olga P4",
  },
  { id: "ogp5", name: "", value: 1, range: [0, 2], step: 1, label: "Olga P5" },
  { id: "ogp6", name: "", value: 1, range: [0, 2], step: 1, label: "Olga P6" },
  { id: "ogp7", name: "", value: 1, range: [0, 2], step: 1, label: "Olga P7" },
];

const punkParamsSchema: ParamSet = [
  {
    id: "syp1",
    name: "spikeNumCtrl",
    value: 5,
    range: [1, 15],
    step: 1,
    label: "Spike Number",
  },
  {
    id: "syp5",
    name: "shaveDotsDensity",
    value: 5,
    range: [3, 10],
    step: 1,
    label: "Shaved Head",
  },
  {
    id: "syp2",
    name: "spikeLengthCtrl",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "Spike Height",
  },
  {
    id: "syp3",
    name: "spikeSpreadCtrl",
    value: 0.5,
    range: [0, 1],
    step: 0.01,
    label: "Spike Spread",
  },
  {
    id: "syp4",
    name: "shrinkRateCtrl",
    value: 0,
    range: [0, 1],
    step: 0.01,
    label: "Spike Shrink Rate",
  },
  {
    id: "syp6",
    name: "spikeSharpnessCtrl",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "Spike Sharpness",
  },
  {
    id: "syp7",
    name: "",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "Syd P7",
  },
];

const baroqueParamsSchema: ParamSet = [
  {
    id: "mzp4",
    name: "curlNumCtrl",
    value: 2,
    range: [1, 6],
    step: 1,
    label: "Curls",
  },
  {
    id: "mzp5",
    name: "",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "Mozart P5",
  },
  {
    id: "mzp1",
    name: "heightCtrl",
    value: 0.5,
    range: [0, 1],
    step: 0.01,
    label: "Height",
  },
  {
    id: "mzp7",
    name: "volCtrl",
    value: 0.5,
    range: [0, 1],
    step: 0.01,
    label: "Volume",
  },
  {
    id: "mzp2",
    name: "hairlineLevelCtrl",
    value: 0.5,
    range: [0, 2],
    step: 0.01,
    label: "Hairline Level",
  },
  {
    id: "mzp3",
    name: "hairlineRidgeCtrl",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "Hairline Ridge",
  },
  {
    id: "mzp6",
    name: "spanCtrl",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "Span",
  },
];


export const archetypes: Model[] = [
  {
    option: "PUNK",
    label: "Punk",
    icon: null,
    model: Punk,
    console: PunkConsole,
    params: punkParamsSchema,
    default: false,
    checked: false,
  },
  {
    option: "BAROQUE",
    label: "Baroque",
    icon: null,
    model: Baroque,
    console: BaroqueConsole,
    params: baroqueParamsSchema,
    default: true,
    checked: false,
  },
  {
    option: "NERD",
    label: "Nerd",
    icon: null,
    model: Nerd,
    console: NerdConsole,
    params: nerdParamsSchema,
    default: false,
    checked: false,
  },
];

