import { Model, Archetype, ParamSet } from "../types";

import DefaultConsole from "../components/consoles/default";
import { baroqueParamsSchema, baseParamSchema, nerdParamsSchema, punkParamsSchema } from "./paramSets";

import { pool as baroqueModels } from "../polka/archetypes/baroque/models";
import { pool as nerdModels } from "../polka/archetypes/nerd/models";
import { pool as punkModels } from "../polka/archetypes/punk/models";
import PolkaBaroque from "../polka/archetypes/baroque/polka";
import PolkaNerd from "../polka/archetypes/nerd/polka";
import PolkaPunk from "../polka/archetypes/punk/polka";

export const punkArchetype: Archetype = {
    option: "PUNK",
    label: "Punk",
    icon: null,
    models: punkModels,
    polka: PolkaPunk,
    baseParams: baseParamSchema,
    params: punkParamsSchema,
    console: DefaultConsole,
    default: false,
    checked: false,
}

export const baroqueArchetype: Archetype = {
    option: "BAROQUE",
    label: "Baroque",
    icon: null,
    models: baroqueModels,
    polka: PolkaBaroque,
    baseParams: baseParamSchema,
    params: baroqueParamsSchema,
    console: DefaultConsole,
    default: true,
    checked: false,
}

export const nerdArchetype: Archetype = {
    option: "NERD",
    label: "Nerd",
    icon: null,
    models: nerdModels,
    polka: PolkaNerd,
    baseParams: baseParamSchema,
    params: nerdParamsSchema,
    console: DefaultConsole,
    default: false,
    checked: false,
}
