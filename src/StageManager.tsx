import { ParamSet } from "./types";

import { PaperScope, Size } from "paper";
import { Rectangle } from "paper/dist/paper-core";

/************************************************/

function calculateOrigin(width: number, height: number) {
  const viewRatio = width / height;

  if (viewRatio <= 1.3 && width < 415) {
    return { x: width / 2, y: height - height * 0.45 };
  }

  if (width < 1080) {
    return { x: width / 2, y: height * 0.45 };
  }

  return { x: width / 2, y: height * 0.4 };
}

function calculateRadius(width: number, height: number) {
  const viewRatio = width / height;

  if (viewRatio <= 1) {
    return width * 0.75 * 0.5;
  }

  return height * 0.6 * 0.5;
}

function parseParams(updatedParams: ParamSet) {
  const modelParams: any = {};

  Array.from(updatedParams.values()).forEach((p: any) => {
    modelParams[p.name] = p.value;
  });

  return modelParams;
}

/************************************************/

export default class StageManager {
  paperScope: paper.PaperScope;
  view: paper.View;
  layer: any;
  realWidth: number = 0;
  realHeight: number = 0;
  origin: { x: number; y: number };
  model: any;
  params: any;

  constructor(canvas: HTMLCanvasElement, archetype: any) {
    this.paperScope = new PaperScope();
    this.paperScope.install(window);
    this.paperScope.setup(canvas);

    this.view = this.paperScope.view;
    this.layer = new this.paperScope.Layer();

    this.origin = calculateOrigin(this.view.size.width, this.view.size.height);
    this.model = new archetype.polka(this.view.center, 200);

    this.model.generate(archetype.models, [], {baseParams: parseParams(archetype.baseParams), archetypeParams: parseParams(archetype.params)});
  }

  // configure(params: any) {
  //   // console.log("! CONFIGURE STAGE");
  //   // this.paperScope.setup(canvas);
  //   this.params = params;
    
  //   this.origin = calculateOrigin(this.view.size.width, this.view.size.height);
  //   this.model.configure(this.origin, parseParams(this.params));
  // }

  update(baseParams: any, params: any) {
    // console.log("! DRAW STAGE ", params);
    this.params = params;
    
    this.paperScope.project.clear();
    this.layer = new this.paperScope.Layer();

    // this.origin = calculateOrigin(this.view.size.width, this.view.size.height);
    this.model.draw(parseParams(baseParams), parseParams(this.params));

    this.realWidth = this.layer.bounds.width;
    this.realHeight = this.layer.bounds.height;
    // this.layer.fitBounds(this.view.bounds);

    if (params[1].name === "baseSizeCtrl") {
      // this.layer.scale(params[1].value);
      this.layer.position = this.view.center;
    }

    // this.layer.position = calculateOrigin(this.view.size.width, this.view.size.height);
  }

  onResize(w: number, h: number) {
    this.view.viewSize = new Size(w, h);
    // this.layer.position = calculateOrigin(this.view.size.width, this.view.size.height);
    this.layer.position = this.view.center;
  }

  exportSVG() {
    // console.log("exporting: ", this.layer);
    // if (this.layer.getItem({name: "render_hack"})) {
    //   // this.layer.getItem({name: "render_hack"}).remove();
    // }
    const layerCopy = this.layer.clone();
    this.layer.fitBounds(new Rectangle(0,0, this.realWidth, this.realHeight));
    const svg = this.layer.exportSVG({ asString: true, bounds: this.layer.bounds });
    this.layer.remove();
    this.layer = layerCopy;
    return svg;
  }
}
