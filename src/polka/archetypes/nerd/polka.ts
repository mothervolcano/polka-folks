import { genRandom } from "../../../lib/topo/utils/helpers";
import Polka from "../../core/polka";

import {
	renderEar,
	renderEye,
	renderFace,
	renderFaceFeature,
	renderHair,
} from "../../renderers/punk";

import * as colors from "../../styles/colorSchemes";

class PolkaNerd extends Polka {
	constructor(position: any, radius: number) {
		super(position, radius);

		this.colorScheme = { ...colors.nerdPolka };
		this.colorScheme.skin =
			this.colorScheme.skin[genRandom(0, this.colorScheme.skin.length - 1)];
		this.colorScheme.hair = this.colorScheme.hair.filter(
			(c: any) => c !== this.colorScheme.skin,
		);
		this.colorScheme.hair =
			this.colorScheme.hair[genRandom(0, this.colorScheme.hair.length - 1)];
	}

	render() {
		// ............................................................

		// plots = this.#plotter.getPlot("hair");

		// for (const plot of plots) {
		// 	instructions = plot?.shift();

		// 	plot.forEach((nPlot: any) => {
		// 		if (Array.isArray(nPlot)) {
		// 			const nInstructions: any = nPlot.shift();

		// 			nPlot.forEach((path) => {
		// 				this.getLayer(instructions.level).addChild(
		// 					renderHair(path, this.#colorScheme, nInstructions.gradient),
		// 				);

		// 				// path.fullySelected = true;
		// 			});
		// 		} else {
		// 			const path = nPlot;

		// 			this.getLayer(instructions.level).addChild(
		// 				renderHair(path, this.#colorScheme, instructions.gradient),
		// 			);

		// 			console.log(`hair model instructions: `, instructions);
		// 		}
		// 	});
		// }

		// -----------------------------------------------------------

		this.compositions.forEach((comp) => {
			if (comp.type === "hair") {
				if (comp.form !== null) {
					if (comp.form.type === "path") {
						comp.form.path.fillColor = "black";
						comp.form.path.copyTo(this.getLayer(0));
					}
					comp.form.path.remove();
				}
			}

			if (comp.type === "hairtail") {
				if (comp.form !== null) {
					if (comp.form.type === "path") {
						comp.form.path.fillColor = "black";
						comp.form.path.copyTo(this.getLayer(0));
					}
					comp.form.path.remove();
				}
			}

			if (comp.type === "hairline") {
				if (comp.form !== null) {
					if (comp.form.type === "path") {
						comp.form.path.fillColor = "black";
						comp.form.path.copyTo(this.getLayer(2));
					}
					comp.form.path.remove();
				}
			}

			if (comp.type === "earwear") {
				if (comp.form !== null) {
					if (comp.form.type === "path") {
						comp.form.path.fillColor = "black";
					}

					if (comp.form.type === "group") {
						comp.form.path.children[1].fillColor = "black";
						// comp.form.path.fillColor = "black";
						comp.form.path.copyTo(this.getLayer(1));
					}
					comp.form.path.remove();
				}
			}

			if (comp.type === "neckwear") {
				if (comp.form !== null) {
					if (comp.form.type === "group") {
						console.log("2 ---->", comp.form.path);
						comp.form.path.children[genRandom(0, 2)].fillColor = "black";
						comp.form.path.copyTo(this.getLayer(1));
					}
					comp.form.path.remove();
				}
			}

			if (comp.type === "eyefeature") {
				if (comp.form !== null) {
					if (comp.form.type === "path") {
						comp.form.path.fillColor = "blue";
						comp.form.path.copyTo(this.getLayer(3));
					}
					comp.form.path.remove();
				}
			}

			if (comp.type === "facefeature") {
				if (comp.form !== null) {
					if (comp.form.type === "path") {
						comp.form.path.fillColor = "blue";
						comp.form.path.copyTo(this.getLayer(3));
					}
					comp.form.path.remove();
				}
			}

			if (comp.type === "glasses") {
				if (comp.form !== null) {
					if (comp.form.type === "path") {
						comp.form.path.strokeColor = "blue";
						comp.form.path.copyTo(this.getLayer(3));
					}
					if (comp.form.type === "group") {
						comp.form.path.strokeColor = "blue";
						comp.form.path.copyTo(this.getLayer(3));
					}
					comp.form.path.remove();
				}
			}
		});

		// ............................................................

		// plots = this.#plotter.getPlot("glasses");

		// for (const plot of plots) {
		// 	instructions = plot?.shift();

		// 	if (Array.isArray(plot[0])) {
		// 		const nPlot = plot[0];
		// 		instructions = nPlot?.shift();

		// 		nPlot.forEach((path) => {
		// 			path.strokeColor = colors.CHART.get(this.#colorScheme.skin).contrast.hex;
		// 			path.strokeWidth = instructions.thickness;

		// 			this.getLayer(instructions.level).addChild(path);
		// 		});
		// 	} else {
		// 		const path = plot[0];

		// 		if (instructions.complete) {
		// 			// this[`l${instructions.level}`].addChild( renderHair( path, this._colorScheme, instructions.gradient ) );
		// 		} else {
		// 			path.fullySelected = true;
		// 		}
		// 	}
		// }

		// -----------------------------------------------------------

		this.getLayer(1).addChild(renderFace(this.head.getAtt("HEAD").getPath(), this.colorScheme));
		this.getLayer(1).addChild(renderEar(this.head.getAtt("EAR_L").getPath(), this.colorScheme));
		this.getLayer(1).addChild(renderEar(this.head.getAtt("EAR_R").getPath(), this.colorScheme));
		this.getLayer(1).addChild(
			renderEye(this.face.getAtt("EYE_L").getPath(), this.colorScheme, false),
		);
		this.getLayer(1).addChild(
			renderEye(this.face.getAtt("EYE_R").getPath(), this.colorScheme, false),
		);
	}
}

export default PolkaNerd;
