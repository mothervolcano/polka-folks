import { Path, Group } from "paper";
import { genRandom } from "../../../lib/topo/utils/helpers";
import Polka from "../../core/polka";

import { applyShade, applyBlush } from "../../../lib/topo/tools/shaders";

import { renderEar, renderEye, renderFace, renderFaceFeature } from "../../renderers/baroque";

import * as colors from "../../styles/colorSchemes";

class PolkaBaroque extends Polka {
	#styles: Map<any, any>;

	constructor(position: any, radius: number) {
		super(position, radius);

		this.colorScheme = { ...colors.baroquePolka };
		this.colorScheme.skin = this.colorScheme.skin[genRandom(0, this.colorScheme.skin.length - 1)];
		this.colorScheme.hair = this.colorScheme.hair.filter((c: any) => c !== this.colorScheme.skin);
		this.colorScheme.hair = this.colorScheme.hair[genRandom(0, this.colorScheme.hair.length - 1)];

		const preRender = (renderer: any, ...args: any[]) => {
			// ...
			// console.log("-----> preRender args: ", args);

			if (args[0] instanceof Group && args[1] === "EACH") {
				for (const path of args[0].children) {
					renderer(path, args.slice(1));
				}
			} else {
				renderer(...args)
			}
		};

		const renderHair = (path: any, ...args: any[]) => {

			path.fillColor = this.colorScheme.hair;
		}

		const renderHairHollow = (path: any, ...args: any[]) => {
			// console.log("-----> render args: ", args);

			const shader = path;

			let gradVector: any;

			if (path instanceof Group ) {
				gradVector = new Path.Line(shader.bounds.topCenter, shader.bounds.bottomCenter);
			} else {
				gradVector = new Path.Line(shader.segments[1].point, shader.segments[3].point);
			}

			applyShade(
				shader,
				colors.CHART.get(this.colorScheme.hair).dark.hex,
				colors.CHART.get(this.colorScheme.hair).dark.hex,
				gradVector,
				colors.CHART.get(this.colorScheme.hair).dark.blendMode,
				0,
				0.75,
			);
		};

		this.#styles = new Map([
			[
				"hair",
				{
					formaRenderer: renderHair,
					shadeRenderer: (...args: any[]) => {
						preRender(renderHairHollow, ...args);
					},
					accentRenderer: null,
					variationRenderer: null,
				},
			],
			[
				"hairline",
				{ formaRenderer: renderHair, shadeRenderer: null, accentRenderer: null, variationRenderer: null },
			],
			[
				"hairtail",
				{ formaRenderer: renderHair, shadeRenderer: null, accentRenderer: null, variationRenderer: null },
			],
			[
				"earwear",
				{ formaRenderer: renderHair, shadeRenderer: null, accentRenderer: null, variationRenderer: null },
			],
			[
				"neckwear",
				{
					formaRenderer: renderHair,
					shadeRenderer: (...args: any[]) => {
						preRender(renderHairHollow, ...args);
					},
					accentRenderer: renderHair,
					variationRenderer: null,
				},
			],
			[
				"eyefeature",
				{
					formaRenderer: renderFaceFeature,
					shadeRenderer: null,
					accentRenderer: null,
					variationRenderer: null,
				},
			],
			[
				"facefeature",
				{
					formaRenderer: renderFaceFeature,
					shadeRenderer: null,
					accentRenderer: null,
					variationRenderer: null,
				},
			],
		]);
	}

	render() {
		// ...

		this.compositions.forEach((comp) => {
			// console.log(".... RENDERING: ", comp.type);

			if (comp.forma !== null) {
				this.#styles.get(comp.type).formaRenderer(comp.forma.path, comp.forma.scope, comp.forma.effect);
				comp.forma.path.copyTo(this.getLayer(comp.forma.level));
				comp.forma.path.remove();
			}

			if (comp.shade !== null) {
				this.#styles.get(comp.type).shadeRenderer(comp.shade.path, comp.shade.scope, comp.shade.effect);
				comp.shade.path.copyTo(this.getLayer(comp.shade.level));
				comp.shade.path.remove();
			}

			if (comp.capital !== null) {
				this.#styles.get(comp.type).accentRenderer(comp.capital.path, comp.capital.scope, comp.capital.effect);
				comp.capital.path.copyTo(this.getLayer(comp.capital.level));
				comp.capital.path.remove();
			}
		});

		// -----------------------------------------------------------

		this.getLayer(1).addChild(renderFace(this.head.getAtt("HEAD").getPath(), this.colorScheme));
		this.getLayer(1).addChild(renderEar(this.head.getAtt("EAR_L").getPath(), this.colorScheme));
		this.getLayer(1).addChild(renderEar(this.head.getAtt("EAR_R").getPath(), this.colorScheme));
		this.getLayer(1).addChild(renderEye(this.face.getAtt("EYE_L").getPath(), this.colorScheme, false));
		this.getLayer(1).addChild(renderEye(this.face.getAtt("EYE_R").getPath(), this.colorScheme, false));
	}
}

export default PolkaBaroque;
