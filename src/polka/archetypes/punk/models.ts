import { ModelConfig } from "../../types";

import { drawHairSpike } from "../../models/hairSpike";
import { drawStubble } from "../../models/face/stubble";

import { metricUnit, PHIGREATER, PHILESSER, SIN54, PHI, SIN } from "../../styles/metrics";

const spike: ModelConfig = {
	use: null,
	type: "SPIKE",
	create: (f, r) => drawHairSpike(f, r),
	order: "first",
	base: null,
	size: metricUnit("PHI", "XXS"),
	level: 2,
	settings: [[metricUnit("PHI", "XL")], [metricUnit("PHI", "XXS")], [0]],
	params: [0.25],
	compats: [],
};

const hairShave: ModelConfig = {
	use: null,
	type: "",
	create: (f, r) => drawStubble(f, r),
	order: "first",
	base: null,
	size: metricUnit("PHI", "XXS"),
	level: 2,
	settings: [],
	params: ["L_EAR_XT", 0.25],
	compats: [],
};

// ---------------------------------------------

spike.compats = [];

// ---------------------------------------------

export const pool = [];
