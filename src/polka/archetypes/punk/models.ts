import { ModelConfig } from "../../types";

import { drawHairSpike } from "../../models/hairSpike";
import { drawHairShave } from "../../models/hairShave";

import { PHIGREATER, PHILESSER, SIN54, PHI, SIN } from "../../styles/metrics";

const spike: ModelConfig = {
	create: (f, r) => drawHairSpike(f, r),
	use: null,
	type: "SPIKE",
	order: "first",
	base: null,
	size: PHI.XXS,
	settings: [[PHI.XL], [PHI.XXS], [0]],
	params: [0.25],
	compats: [],
};

const hairShave: ModelConfig = {
	create: (f, r) => drawHairShave(f, r),
	use: null,
	type: "",
	order: "first",
	base: null,
	size: PHI.XXS,
	settings: [],
	params: ["L_EAR_XT", 0.25],
	compats: [],
};

// ---------------------------------------------

spike.compats = [];

// ---------------------------------------------

export const pool = [];
