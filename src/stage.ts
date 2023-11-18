import { Layer } from 'paper';
import { paper } from './components/paperStage';

import { markPoint } from './lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


let view: any
let layer: any
let origin: any

let polka: any


export function reset() {

    paper.project.clear();
    view = paper.project.view
    layer = new Layer()
};


export function generate(
  
  archetype: any,
  baseParams: any,
  archetypeParams: any,

) {


  origin = view.center;

  console.log(`..... Generating Polka: `, archetype);

  if ( archetype ) {

    polka = new archetype( origin, 100 );

  } else {

    //TODO: handle instance management
  }


  polka.generate( { baseParams, archetypeParams } );

}

// ------------------------------------------------

export function model(

  baseParams: any,
  archetypeParams: any,

) {

  origin = view.center;

  polka.model( { baseParams, archetypeParams } );

}

// ------------------------------------------------

export function regenerate(

  baseParams: any,
  archetypeParams: any,

) {

  origin = view.center;

  console.log(`..... Regenerating Polka`);

  polka.clear();
  polka.generate( { baseParams, archetypeParams } );


}

// ------------------------------------------------

export function save() {

  const svg = paper.project.exportSVG({ bounds:'content', asString:true }) as string;


  const svgFile = new Blob([svg], { type: 'image/svg+xml' });

  const url = URL.createObjectURL(svgFile);

  const dwnLink = document.createElement('a');
  dwnLink.href = url;
  dwnLink.download = 'artwork.svg'; 
  dwnLink.click();
  URL.revokeObjectURL(url);

}


