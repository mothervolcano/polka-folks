import { Model, Archetype, ParamSet } from "../types";

import { pool as baroqueModels } from "../polka/archetypes/baroque/models";
import { pool as nerdModels } from "../polka/archetypes/nerd/models";
import { pool as punkModels } from "../polka/archetypes/punk/models";
import PolkaBaroque from "../polka/archetypes/baroque/polka";
import PolkaNerd from "../polka/archetypes/nerd/polka";
import PolkaPunk from "../polka/archetypes/punk/polka";
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
    name: "spikeRadiusCtrl",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "Spike Size",
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
    name: "p7",
    value: 0.5,
    range: [0, 1],
    step: 0.01,
    label: "Syd P7",
  },
];

const baroqueParamsSchema: ParamSet = [
  {
    id: "mzp1",
    name: "curlNumCtrl",
    value: 2,
    range: [1, 6],
    step: 1,
    label: "Curls",
  },
  {
    id: "mzp2",
    name: "p2Ctrl",
    value: 1,
    range: [0, 1],
    step: 0.01,
    label: "P2",
  },
  {
    id: "mzp3",
    name: "heightCtrl",
    value: 0.5,
    range: [0, 1],
    step: 0.01,
    label: "Height",
  },
  {
    id: "mzp4",
    name: "volCtrl",
    value: 0.5,
    range: [0, 1],
    step: 0.01,
    label: "Volume",
  },
  {
    id: "mzp5",
    name: "p5Ctrl",
    value: 0.5,
    range: [0, 2],
    step: 0.01,
    label: "P5",
  },
  {
    id: "mzp6",
    name: "p6Ctrl",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "P6",
  },
  {
    id: "mzp7",
    name: "p7Ctrl",
    value: 1,
    range: [0, 2],
    step: 0.01,
    label: "P7",
  },
];

export const archetypes: Archetype[] = [
  {
    option: "PUNK",
    label: "Punk",
    icon: null,
    models: punkModels,
    polka: PolkaPunk,
    console: PunkConsole,
    params: punkParamsSchema,
    default: false,
    checked: false,
  },
  {
    option: "BAROQUE",
    label: "Baroque",
    icon: null,
    models: baroqueModels,
    polka: PolkaBaroque,
    console: BaroqueConsole,
    params: baroqueParamsSchema,
    default: true,
    checked: false,
  },
  {
    option: "NERD",
    label: "Nerd",
    icon: null,
    models: nerdModels,
    polka: PolkaNerd,
    console: NerdConsole,
    params: nerdParamsSchema,
    default: false,
    checked: false,
  },
];
