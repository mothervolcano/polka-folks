import { Layer } from 'paper';
import { paperScope } from './components/paperStage';

import Nerd from './polka_modules/archetypes/nerd';
import Punk from './polka_modules/archetypes/punk';
import Baroque from './polka_modules/archetypes/baroque';

import { markPoint } from './lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



let view: any
let layer: any
let origin: any

let polka: any


export function reset() {

    paperScope.project.clear();
    view = paperScope.project.view
    layer = new Layer()
};


export function generate(
  
  archetype: string,
  baseParams: any,
  archetypeParams: any,

) {

  // initLibrary( paper )

  origin = view.center;

  let _archetype;

  switch( archetype ) {

    case 'PUNK': 
      _archetype = Punk;
    break;

    case 'NERD':
      _archetype = Nerd;
    break;

    case 'BAROQUE':
      _archetype = Baroque;
    break;

  }

  console.log(`..... Generating Polka: ${archetype}`);

  if ( _archetype ) {

    polka = new _archetype( origin, 100 );

  } else {

    //TODO: error message
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

  const svg = paperScope.project.exportSVG({ bounds:'content', asString:true }) as string;


  const svgFile = new Blob([svg], { type: 'image/svg+xml' });

  const url = URL.createObjectURL(svgFile);

  const dwnLink = document.createElement('a');
  dwnLink.href = url;
  dwnLink.download = 'artwork.svg'; 
  dwnLink.click();
  URL.revokeObjectURL(url);

}


