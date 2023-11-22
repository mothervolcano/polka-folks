import { ModelConfig } from "../../types";

import { drawPompadourWig } from "../../models/pompadourWig";
import { drawAntoinetteWig } from "../../models/antoinetteWig";
import { drawHairCurl } from "../../models/hairCurl";
import { drawHairline } from "../../models/hairline";
import { drawMozartHairline } from "../../models/mozartHairline";
import { drawBangHairline } from "../../models/bangHairline";
import { HairPanache, drawHairPanache } from "../../models/hairPanache";
import { drawHairCrest } from "../../models/hairCrest";
import { drawElliWavyTail } from "../../models/elliWavyTail";
import { drawArchiCurlCrown } from "../../models/archiCurlCrown";
import { drawCascadingTail } from "../../models/cascadingTail";
import { Earrings, drawEarrings } from "../../models/earrings";
import { drawNecklace } from "../../models/necklace";
import { drawJabot } from "../../models/jabot";

import { EyeLashes, drawEyeLashes } from "../../models/eyeLashes";
import { Blush, drawBlush } from "../../models/blush";

import { drawEarModelTest } from "../../models/earModelTest";

import { metricUnit, PHIGREATER, PHILESSER, SIN54, PHI, SIN } from "../../styles/metrics";


const antoinette: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawAntoinetteWig(f, r, "hair"),
	use: null,
	base: null,
	size: metricUnit("PHI", "XL"),
	level: 0,
	settings: [[metricUnit("PHI", "L"), metricUnit("PHI", "XL")], [metricUnit("SIN", "L"), metricUnit("SIN", "S")], [0.2]],
	params: [0.25],
	compats: [],
};

const pompadour: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawPompadourWig(f, r, 'hair'),
	use: null,
	base: null,
	size: metricUnit("SIN", "XL"),
	level: 0,
	settings: [[metricUnit("PHI", "L"), metricUnit("PHI", "XL")], [metricUnit("SIN", "L"), metricUnit("SIN", "S")], [0.2]],
	params: [0.25],
	compats: [],
};

const curlDome: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, r) => drawArchiCurlCrown(f, r, "hair"),
	use: null,
	base: null,
	size: metricUnit("PHI", "XL"),
	level: 0,
	settings: [[metricUnit("PHI", "M")], [metricUnit("PHI", "L")], [3], [0.1]],
	params: [0.25],
	compats: [],
};

const crest: ModelConfig = {
	type: "hair",
	order: "second",
	create: (f, r) => drawHairCrest(f, r, "hair"),
	use: null,
	base: null,
	size: metricUnit("PHI", "L"),
	level: 0,
	settings: [],
	params: [0.25, 0.1],
	compats: [],
};

const panache: ModelConfig = {
	type: "hair",
	order: "second",
	create: (f, r) => new HairPanache(f, r, "hair"),
	use: null,
	base: null,
	size: metricUnit("PHI", "M"),
	level: 0,
	settings: [],
	params: [0.25],
	compats: [],
};

const hairline: ModelConfig = {
	type: "hairline",
	order: "first",
	create: (f, r) => drawHairline(f, r, "hairline"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "M"),
	level: 2,
	settings: [],
	params: ["L_EAR_XT", "R_EAR_XT", 0.25],
	compats: [],
};

const bangLine: ModelConfig = {
	type: "hairline",
	order: "first",
	create: (f, r) => drawBangHairline(f, r, "hairline"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "M"),
	level: 2,
	settings: [],
	params: ["L_EAR_XT", "R_EAR_XT", 0.25],
	compats: [],
};

const mozartLine: ModelConfig = {
	type: "hairline",
	order: "first",
	create: (f, r) => drawMozartHairline(f, r, "hairline"),
	use: null,
	base: "HEAD",
	size: metricUnit("PHI", "M"),
	level: 2,
	settings: [],
	params: ["L_EAR_XT", "R_EAR_XT", 0.25],
	compats: [],
};

const cascadeTail: ModelConfig = {
	type: "hairtail",
	order: "first",
	create: (f, r) => drawCascadingTail(f, r, "hairtail"),
	use: null,
	base: null,
	size: metricUnit("PHI", "L"),
	level: 0,
	settings: [],
	params: [0.25],
	compats: [],
};

const wavyTail: ModelConfig = {
	type: "hairtail",
	order: "first",
	create: (f, r) => drawElliWavyTail(f, r, "hairtail"),
	use: null,
	base: null,
	size: metricUnit("SIN", 'XL'),
	level: 0,
	settings: [[metricUnit("PHI", "XL")], [metricUnit("SIN", "L")]],
	params: [0.25],
	compats: [],
};

const earringLeft: ModelConfig = {
	type: "earwear",
	order: "first",
	create: (f, r) => drawEarrings(f, r, "earwear"),
	use: null,
	base: "HEAD",
	size: metricUnit("SIN", "XS"),
	level: 2,
	settings: [],
	params: ["EAR_L", 0.75],
	compats: [],
};

const earringRight: ModelConfig = {
	type: "earwear",
	order: "first",
	create: (f, r) => drawEarrings(f, r, "earwear"),
	use: null,
	base: "HEAD",
	size: metricUnit("SIN", "XS"),
	level: 2,
	settings: [],
	params: ["EAR_R", 0.75],
	compats: [],
};

const lashesLeft: ModelConfig = {
	type: "eyefeature",
	order: "first",
	create: (f, r) => drawEyeLashes(f, r, "eyefeature"),
	use: null,
	base: "FACE",
	size: metricUnit("SIN", "XS"),
	level: 2,
	settings: [],
	params: ["EYE_L", 0.75],
	compats: [],
};

const lashesRight: ModelConfig = {
	type: "eyefeature",
	order: "first",
	create: (f, r) => drawEyeLashes(f, r, "eyefeature"),
	use: null,
	base: "FACE",
	size: metricUnit("SIN", "XS"),
	level: 2,
	settings: [],
	params: ["EYE_R", 0.75],
	compats: [],
};

const blushLeft: ModelConfig = {
	type: "facefeature",
	order: "first",
	create: (f, r) => drawBlush(f, r, "facefeature"),
	use: null,
	base: "FACE",
	size: metricUnit("PHI", "S"),
	level: 2,
	settings: [],
	params: ["CHEEK_L"],
	compats: [],
};

const blushRight: ModelConfig = {
	type: "facefeature",
	order: "first",
	create: (f, r) => drawBlush(f, r, "facefeature"),
	use: null,
	base: "FACE",
	size: metricUnit("PHI", "S"),
	level: 2,
	settings: [],
	params: ["CHEEK_R"],
	compats: [],
};

const jabot: ModelConfig = {
	type: "neckwear",
	order: "first",
	create: (f, r) => drawJabot(f, r, "neckwear"),
	use: null,
	base: null,
	size: metricUnit("SIN", "XL"),
	level: 0,
	settings: [],
	params: [0.75],
	compats: [],
};

const necklace: ModelConfig = {
	type: "neckwear",
	order: "first",
	create: (f, r) => drawNecklace(f, r, "neckwear"),
	use: null,
	base: null,
	size: metricUnit("SIN", "XS"),
	level: 0,
	settings: [],
	params: [0.75 - 0.1, 0.75 + 0.1],
	compats: [],
};

const earModelTest: ModelConfig = {
	type: "earwear",
	order: "first",
	create: (f, r) => drawEarModelTest(f, r, 'earwear'),
	use: null,
	base: "HEAD",
	size: metricUnit("SIN", "XS"),
	level: 2,
	settings: [],
	params: ["EAR_L", 0.75],
	compats: [],
};


antoinette.compats = [crest, { ...panache }];
crest.compats = [{ ...panache }];

export const pool = [
	antoinette,
	pompadour,
	curlDome,
	crest,
	panache,
	hairline,
	bangLine,
	mozartLine,
	cascadeTail,
	wavyTail,
	lashesLeft,
	lashesRight,
	blushLeft,
	blushRight,
	jabot,
	necklace,
	earModelTest,
	earringLeft,
	earringRight
];


