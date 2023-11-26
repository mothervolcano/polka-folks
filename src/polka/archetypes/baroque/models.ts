import { IModel, ModelConfig } from "../../types";

import { drawPompadour } from "../../models/hair/pompadour";
import { drawAntoinette } from "../../models/hair/antoinette";
import { drawHairCurl } from "../../models/hairCurl";
import { HairPanache, drawHairPanache } from "../../models/hairPanache";
import { drawHairCrest } from "../../models/hairCrest";
import { drawElliWavyTail } from "../../models/elliWavyTail";
import { drawArchiCurlCrown } from "../../models/hair/archiCurlCrown";
import { drawCascadingTail } from "../../models/cascadingTail";
import { Earrings, drawEarrings } from "../../models/earwear/earrings";
import { drawNecklace } from "../../models/neckwear/necklace";
import { drawJabot } from "../../models/neckwear/jabot";
import { drawAscot } from "../../models/neckwear/ascot";

import { EyeLashes, drawEyeLashes } from "../../models/eyewear/eyeLashes";
import { Blush, drawBlush } from "../../models/face/blush";

import { drawEarModelTest } from "../../models/earwear/earModelTest";

import { metricUnit, PHIGREATER, PHILESSER, SIN54, PHI, SIN } from "../../styles/metrics";


const antoinette: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, t) => drawAntoinette(f, t),
	use: null,
	base: null,
	size: metricUnit("PHI", "XL"),
	level: 1,
	settings: [[metricUnit("PHI", "L"), metricUnit("PHI", "XL")], [metricUnit("SIN", "L"), metricUnit("SIN", "S")], [0.2]],
	params: [0.25],
	compats: [],
};

const pompadour: ModelConfig = {
	type: "hair",
	order: "first",
	create: (f, t) => drawPompadour(f, t),
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
	create: (f, t) => drawArchiCurlCrown(f, t),
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
	create: (f, t) => drawHairCrest(f, t),
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
	create: (f, t) => new HairPanache(f, t),
	use: null,
	base: null,
	size: metricUnit("PHI", "M"),
	level: 0,
	settings: [],
	params: [0.25],
	compats: [],
};

const cascadeTail: ModelConfig = {
	type: "hairtail",
	order: "first",
	create: (f, t) => drawCascadingTail(f, t),
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
	create: (f, t) => drawElliWavyTail(f, t),
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
	create: (f, t) => drawEarrings(f, t),
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
	create: (f, t) => drawEarrings(f, t),
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
	create: (f, t) => drawEyeLashes(f, t),
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
	create: (f, t) => drawEyeLashes(f, t),
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
	create: (f, t) => drawBlush(f, t),
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
	create: (f, t) => drawBlush(f, t),
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
	create: (f, t) => drawJabot(f, t),
	use: null,
	base: null,
	size: metricUnit("SIN", "XL"),
	level: 0,
	settings: [],
	params: [0.75],
	compats: [],
};

const ascot: ModelConfig = {
	type: "neckwear",
	order: "first",
	create: (f, t) => drawAscot(f, t),
	use: null,
	base: null,
	size: metricUnit("SIN", "XL"),
	level: 0,
	settings: [0.75],
	params: [],
	compats: [],
};

const necklace: ModelConfig = {
	type: "neckwear",
	order: "first",
	create: (b, t) => drawNecklace(b, t),
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
	base: "HEAD",
	create: (b, t) => drawEarModelTest(b, t),
	use: null,
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
	cascadeTail,
	wavyTail,
	lashesLeft,
	lashesRight,
	blushLeft,
	blushRight,
	// jabot,
	ascot,
	// necklace,
	earModelTest,
	earringLeft,
	earringRight
];


