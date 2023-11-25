import { ModelConfig } from "polka/types";

import { drawIonicHair } from "polka/models/hair/ionic";
import { drawDennisHair } from "polka/models/hair/dennis";
import { drawAugustine } from "polka/models/hair/augustine";
import { drawHairDome } from "polka/models/hairDome";
import { drawArcWave } from "polka/models/arcWave";
import { drawHairCurtain } from "polka/models/hairCurtain";
import { drawBangHairline } from "polka/models/hair/hairlines/bang";
import { drawBilly } from "polka/models/hair/billy";
import { drawHairCurtainHide } from "polka/models/hairCurtainHide";
import { drawHairCapeTail } from "polka/models/hairCapeTail";
import { drawHairCap } from "polka/models/hairCap";
import { drawHairModelTest } from "polka/models/hairModelTest";

import { drawRoundGlasses } from "polka/models/eyewear/roundGlasses";

import { metricUnit, PHIGREATER, PHILESSER, SIN54, PHI, SIN } from "../../styles/metrics";

const hairDome: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawHairDome(f, r),
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
	create: (f, r) => drawIonicHair(f, r),
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
	create: (f, r) => drawDennisHair(f, r),
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
	create: (f, r) => drawHairCurtainHide(f, r),
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
	create: (f, r) => drawHairCapeTail(f, r),
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
	create: (f, r) => drawHairCap(f, r),
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
	create: (f, r) => drawHairCurtain(f, r),
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
	create: (f, r) => drawBangHairline(f, r),
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
	create: (f, r) => drawBilly(f, r),
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
	create: (f, r) => drawArcWave(f, r),
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
	create: (f, r) => drawArcWave(f, r),
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
	create: (f, r) => drawRoundGlasses(f, r),
	use: null,
	base: "FACE",
	size: metricUnit("PHI", "XL"),
	level: 3,
	settings: [],
	params: ["EYE_L", "EYE_R"],
	compats: [],
};

const billyMonkHair: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawAugustine(f, r),
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
	create: (f, r) => drawHairModelTest(f, r),
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
// hairCape.compats = [{ ...arcPattern }, { ...zigzag }];
hairCurtainHide.compats = [{ ...hairCape }];
hairCap.compats = [{ ...hairCape }, { ...hairCurtainHide }, { ...arcPattern }, { ...zigzag }];
hairDome.compats = [{ ...arcPattern }, { ...zigzag }, { ...billyFlaps }];

// ..................................................

// export const pool = [hairCape, hairCurtainHide, hairCap, hairDome, roundGlasses];
export const pool = [hairCape, roundGlasses];



