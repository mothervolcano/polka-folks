import { ModelConfig } from "../../types";

import { drawIonicHair } from "../../models/ionicHair";
import { drawDennisHair } from "../../models/dennisHair";
import { drawBillyMonkHair } from "../../models/billyMonkHair";
import { drawHairDome } from "../../models/hairDome";
import { drawArcWave } from "../../models/arcWave";
import { drawHairCurtain } from "../../models/hairCurtain";
import { drawBangHairline } from "../../models/bangHairline";
import { drawBillyHairFlaps } from "../../models/billyHairFlaps";
import { drawHairCurtainHide } from "../../models/hairCurtainHide";
import { drawHairCapeTail } from "../../models/hairCapeTail";
import { drawHairCap } from "../../models/hairCap";
import { drawHairModelTest } from "../../models/hairModelTest";

import { drawRoundGlasses } from "../../models/roundGlasses";

import { metricUnit, PHIGREATER, PHILESSER, SIN54, PHI, SIN } from "../../styles/metrics";

const hairDome: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairDome(f, r),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	settings: [],
	params: [],
	compats: [],
};

const ionicHair: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawIonicHair(f, r),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	settings: [],
	params: [0, 0.5],
	compats: [],
};

const dennisHair: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawDennisHair(f, r),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	settings: [],
	params: [0.2],
	compats: [],
};

const hairCurtainHide: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairCurtainHide(f, r),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "L"),
	settings: [],
	params: ["L_EAR_XT", "R_EAR_XT"],
	compats: [],
};

const hairCape: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairCapeTail(f, r),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	settings: [],
	params: [],
	compats: [],
};

const hairCap: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairCap(f, r),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "L"),
	settings: [],
	params: [],
	compats: [],
};

const hairCurtain: ModelConfig = {
	type: "hairline",
	order: "first",
	create: (f, r) => drawHairCurtain(f, r),
	use: null,
	base: null,
	size: metricUnit("PHI", "XL"),
	settings: [],
	params: ["L_EAR_XT", "R_EAR_XT", 0.25],
	compats: [],
};

const bangs: ModelConfig = {
	type: "hairline",
	order: "first",
	create: (f, r) => drawBangHairline(f, r),
	use: null,
	base: null,
	size: metricUnit("PHI", "L"),
	settings: [],
	params: ["L_EAR_XT", "R_EAR_XT", 0.25],
	compats: [],
};

const billyFlaps: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawBillyHairFlaps(f, r),
	use: null,
	base: null,
	size: metricUnit("PHI", "L"),
	settings: [],
	params: [0.25],
	compats: [],
};

const arcPattern: ModelConfig = {
	type: "hair",
	order: "second",
	create: (f, r) => drawArcWave(f, r),
	use: null,
	base: null,
	size: metricUnit("PHI", "XL"),
	settings: [3],
	params: [],
	compats: [],
};

const zigzag: ModelConfig = {
	type: "hair",
	order: "second",
	create: (f, r) => drawArcWave(f, r),
	use: null,
	base: null,
	size: metricUnit("PHI", "XL"),
	settings: [10],
	params: [],
	compats: [],
};

const roundGlasses: ModelConfig = {
	type: "eyewear",
	order: "first",
	create: (f, r) => drawRoundGlasses(f, r),
	use: null,
	base: "FACE",
	size: metricUnit("PHI", "XL"),
	settings: [],
	params: ["EYE_L", "EYE_R"],
	compats: [],
};

const billyMonkHair: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawBillyMonkHair(f, r),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	settings: [],
	params: [],
	compats: [],
};

const hairModelTest: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairModelTest(f, r),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "L"),
	settings: [],
	params: [],
	compats: [],
};

// ...................................................

// hairDome.compats = [ { ...billyFlaps } ];
hairCape.compats = [{ ...arcPattern }, { ...zigzag }];
hairCurtainHide.compats = [{ ...hairCape }];
hairCap.compats = [{ ...hairCape }, { ...hairCurtainHide }, { ...arcPattern }, { ...zigzag }];
hairDome.compats = [{ ...arcPattern }, { ...zigzag }, { ...billyFlaps }];

// ..................................................

// export const pool = [hairCape, hairCurtainHide, hairCap, hairDome, roundGlasses];
export const pool = [hairDome];



