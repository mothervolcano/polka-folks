import { Menu } from "@mantine/core";
import { MetricScale, MetricScaleType, MetricUnitType } from "../types";

function radToDeg(rad: number) {
	return rad * (180.0 / Math.PI);
}

function degToRad(deg: number) {
	return deg * (Math.PI / 180.0);
}

export const PHI = {
	XXS: "PHI.XXS",
	XS: "PHI.XS",
	S: "PHI.S",
	M: "PHI.M",
	L: "PHI.L",
	XL: "PHI.XL",
};

export const SIN = {
	XXS: "SIN.XXS",
	XS: "SIN.XS",
	S: "SIN.S",
	M: "SIN.M",
	L: "SIN.L",
	XL: "SIN.XL",
};

export const PHIGREATER = 1.618033988;
export const PHILESSER = 0.618033988;

export const SIN45 = Math.sin(degToRad(45));

export const SIN9 = Math.sin(degToRad(9));
export const SIN18 = Math.sin(degToRad(18));
export const SIN36 = Math.sin(degToRad(36));
export const SIN54 = Math.sin(degToRad(54));
export const SIN72 = Math.sin(degToRad(72));


export function generateScaleFor(scale: MetricScaleType, baseUnit: number): MetricScale {
	switch (scale) {
		case "PHI":
			return {
				XXS: baseUnit * PHILESSER * PHILESSER * PHILESSER * PHILESSER * PHILESSER,
				XS: baseUnit * PHILESSER * PHILESSER * PHILESSER * PHILESSER,
				S: baseUnit * PHILESSER * PHILESSER * PHILESSER,
				M: baseUnit * PHILESSER * PHILESSER,
				L: baseUnit * PHILESSER,
				XL: baseUnit * PHIGREATER,
			};
		case "SIN":
			return {
				XXS: baseUnit * SIN9,
				XS: baseUnit * SIN18,
				S: baseUnit * SIN36,
				M: baseUnit * SIN54,
				L: baseUnit * SIN72,
				XL: baseUnit * 1 + SIN18,
			};
		default: throw new Error(`ERROR @metrics.generatateScaleFor. Cannot generate scale for ${scale}. Invalid scale type.`)
	}
}

export function metricUnit(scale: MetricScaleType, unit: MetricUnitType) {

	return {scale, unit}
}

export function getValueFor() {
	
}
