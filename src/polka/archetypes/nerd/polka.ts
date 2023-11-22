import { genRandom } from "../../../lib/topo/utils/helpers";
import Polka from "../../core/polka";

import { renderEar, renderEye, renderFace, renderFaceFeature, renderHair } from "../../renderers/punk";

import * as colors from "../../styles/colorSchemes";

class PolkaNerd extends Polka {
	#styles: Map<any, any>;

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
		};

		this.#styles = new Map([
			["hair", {renderer: renderHair}],
			["hairline", {renderer: renderHair}],
			["hairtail", {renderer: renderHair}],
			["earwear", {renderer: renderHair}],
			["neckwear", {renderer: renderHair}],
			["eyefeature", {renderer: renderFaceFeature}],
			["facefeature", {renderer: renderFaceFeature}],
			["eyewear", {renderer: renderGlasses}],
		]);
	}

	render() {
		this.compositions.forEach((comp) => {
			if (comp.form !== null) {
				if (comp.form.type === "path") {
					this.#styles.get(comp.type).renderer(comp.form.path, this.colorScheme, false);
				}

				if (comp.form.type === "group") {
					this.#styles.get(comp.type).renderer(comp.form.path, this.colorScheme, false);
				}
				comp.form.path.copyTo(this.getLayer(comp.form.level));
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
