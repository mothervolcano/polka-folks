import { genRandom } from "../../../lib/topo/utils/helpers";
import Polka from "../../core/polka";

import { renderEar, renderEye, renderFace, renderFaceFeature, renderHair } from "../../renderers/baroque";

import * as colors from "../../styles/colorSchemes";

class PolkaBaroque extends Polka {
	
	#styles: any;

	constructor(position: any, radius: number) {
		super(position, radius);

		// this.colorScheme = colors.defaultPolka;

		this.colorScheme = { ...colors.baroquePolka };
		this.colorScheme.skin = this.colorScheme.skin[genRandom(0, this.colorScheme.skin.length - 1)];
		this.colorScheme.hair = this.colorScheme.hair.filter((c: any) => c !== this.colorScheme.skin);
		this.colorScheme.hair = this.colorScheme.hair[genRandom(0, this.colorScheme.hair.length - 1)];

		this.#styles = {
			hair: renderHair,
			hairline: renderHair,
			hairtail: renderHair,
			earwear: renderHair,
			neckwear: renderHair,
			eyefeature: renderFaceFeature,
			facefeature: renderFaceFeature,
		};
	}


	render() {

		// -----------------------------------------------------------

		this.compositions.forEach((comp) => {
			if (comp.form !== null) {
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

export default PolkaBaroque;
