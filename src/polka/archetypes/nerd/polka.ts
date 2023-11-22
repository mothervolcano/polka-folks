import { genRandom } from "../../../lib/topo/utils/helpers";
import Polka from "../../core/polka";

import { renderEar, renderEye, renderFace, renderFaceFeature, renderHair } from "../../renderers/punk";

import * as colors from "../../styles/colorSchemes";

class PolkaNerd extends Polka {
	
	#styles: any;

	constructor(position: any, radius: number) {
		super(position, radius);

		this.colorScheme = { ...colors.nerdPolka };
		this.colorScheme.skin = this.colorScheme.skin[genRandom(0, this.colorScheme.skin.length - 1)];
		this.colorScheme.hair = this.colorScheme.hair.filter((c: any) => c !== this.colorScheme.skin);
		this.colorScheme.hair = this.colorScheme.hair[genRandom(0, this.colorScheme.hair.length - 1)];

		const renderGlasses = (path: any) => {
			path.strokeWidth = 5;
			path.strokeColor = "black";
			path.copyTo(this.getLayer(3));
			path.remove();
		}

		this.#styles = {
			hair: renderHair,
			hairline: renderHair,
			hairtail: renderHair,
			earwear: renderHair,
			neckwear: renderHair,
			eyefeature: renderFaceFeature,
			facefeature: renderFaceFeature,
			eyewear: renderGlasses,
		};
	}


	render() {
		this.compositions.forEach((comp) => {
			if (comp.form !== null) {

				console.log('RENDERING... ', comp.type)

				if (comp.form.type === "path") {
					this.#styles[comp.type](comp.form.path, this.colorScheme, false);
				}

				if (comp.form.type === "group") {
					this.#styles[comp.type](comp.form.path, this.colorScheme, false);
				}
				comp.form.path.copyTo(this.getLayer(1));
				comp.form.path.remove();
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

export default PolkaNerd;
