import { Group } from "paper";
import { genRandom } from "../../../lib/topo/utils/helpers";
import Polka from "../../core/polka";

import {
	renderEar,
	renderEye,
	renderFace,
	renderFaceFeature,
} from "../../renderers/punk";

import * as colors from "../../styles/colorSchemes";

class PolkaPunk extends Polka {
	#styles: Map<any, any>;
	
	constructor(position: any, radius: number) {
		super(position, radius);

		// ------------------------------------------------------------------------

		this.colorScheme = { ...colors.punkPolka };
		this.colorScheme.skin =
			this.colorScheme.skin[genRandom(0, this.colorScheme.skin.length - 1)];
		this.colorScheme.hair = this.colorScheme.hair.filter(
			(c: any) => c !== this.colorScheme.skin,
		);
		this.colorScheme.hair =
			this.colorScheme.hair[genRandom(0, this.colorScheme.hair.length - 1)];
		
		// ------------------------------------------------------------------------

		const preRender = (renderer: any, ...args: any[]) => {
			// ...
			console.log("-----> preRender args: ", args);

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

		// ------------------------------------------------------------------------

		this.#styles = new Map([
			[
				"hair",
				{
					formaRenderer: renderHair,
					shadeRenderer: (...args: any[]) => {
						preRender(renderHair, ...args);
					},
					accentRenderer: renderHair,
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
				{ formaRenderer: renderHair, shadeRenderer: null, accentRenderer: null, variationRenderer: null },
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
			console.log(".... RENDERING: ", comp.type);

			if (comp.forma !== null) {
				this.#styles.get(comp.type).formaRenderer(comp.forma.path, comp.forma.scope, comp.forma.effect);
				comp.forma.path.copyTo(this.getLayer(comp.forma.level));
				comp.forma.path.remove();
			}

			if (comp.shade !== null) {
				this.#styles.get(comp.type).shadeRenderer(comp.shade.path, comp.shade.scope, comp.shade.effect);
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

export default PolkaPunk;
