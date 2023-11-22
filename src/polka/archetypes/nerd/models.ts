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
	create: (f, r) => drawHairDome(f, r, "hair"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	level: 0,
	settings: [],
	params: [],
	compats: [],
};

const ionicHair: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawIonicHair(f, r, "hair"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	level: 0,
	settings: [],
	params: [0, 0.5],
	compats: [],
};

const dennisHair: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawDennisHair(f, r, "hair"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	level: 2,
	settings: [],
	params: [0.2],
	compats: [],
};

const hairCurtainHide: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairCurtainHide(f, r, "hair"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "L"),
	level: 3,
	settings: [],
	params: ["L_EAR_XT", "R_EAR_XT"],
	compats: [],
};

const hairCape: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairCapeTail(f, r, "hair"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	level: 0,
	settings: [],
	params: [],
	compats: [],
};

const hairCap: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairCap(f, r, "hair"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "L"),
	level: 3,
	settings: [],
	params: [],
	compats: [],
};

const hairCurtain: ModelConfig = {
	type: "hairline",
	order: "first",
	create: (f, r) => drawHairCurtain(f, r, "hair"),
	use: null,
	base: null,
	size: metricUnit("PHI", "XL"),
	level: 3,
	settings: [],
	params: ["L_EAR_XT", "R_EAR_XT", 0.25],
	compats: [],
};

const bangs: ModelConfig = {
	type: "hairline",
	order: "first",
	create: (f, r) => drawBangHairline(f, r, "hairline"),
	use: null,
	base: null,
	size: metricUnit("PHI", "L"),
	level: 3,
	settings: [],
	params: ["L_EAR_XT", "R_EAR_XT", 0.25],
	compats: [],
};

const billyFlaps: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawBillyHairFlaps(f, r, "hair"),
	use: null,
	base: null,
	size: metricUnit("PHI", "L"),
	level: 3,
	settings: [],
	params: [0.25],
	compats: [],
};

const arcPattern: ModelConfig = {
	type: "hair",
	order: "second",
	create: (f, r) => drawArcWave(f, r, "hair"),
	use: null,
	base: null,
	size: metricUnit("PHI", "XL"),
	level: 0,
	settings: [3],
	params: [],
	compats: [],
};

const zigzag: ModelConfig = {
	type: "hair",
	order: "second",
	create: (f, r) => drawArcWave(f, r, "hair"),
	use: null,
	base: null,
	size: metricUnit("PHI", "XL"),
	level: 0,
	settings: [10],
	params: [],
	compats: [],
};

const roundGlasses: ModelConfig = {
	type: "eyewear",
	order: "first",
	create: (f, r) => drawRoundGlasses(f, r, "eyewear"),
	use: null,
	base: "FACE",
	size: metricUnit("PHI", "XL"),
	level: 0,
	settings: [],
	params: ["EYE_L", "EYE_R"],
	compats: [],
};

const billyMonkHair: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawBillyMonkHair(f, r, "hair"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "XL"),
	level: 0,
	settings: [],
	params: [],
	compats: [],
};

const hairModelTest: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairModelTest(f, r, "hair"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "L"),
	level: 0,
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

export const pool = [hairCape, hairCurtainHide, hairCap, hairDome, roundGlasses];
// export const pool = [hairCurtainHide];



