import { ModelConfig } from "../../types";

import { drawKeith } from "../../models/hair/keith";
import { drawStubble } from "../../models/face/stubble";

import { metricUnit, PHIGREATER, PHILESSER, SIN54, PHI, SIN } from "../../styles/metrics";

const keith: ModelConfig = {
	use: null,
	type: "hair",
	create: (f, r) => drawKeith(f, r),
	order: "first",
	base: null,
	size: metricUnit("PHI", "BASE"),
	level: -1,
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
	level: 0,
	settings: [],
	params: ["L_EAR_XT", 0.25],
	compats: [],
};

// ---------------------------------------------

keith.compats = [];

// ---------------------------------------------

export const pool = [ keith ];
