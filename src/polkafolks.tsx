import { Layer } from 'paper';
import { paperScope } from './components/paperStage';

import Nerd from './polka_modules/archetypes/olga';
import Punk from './polka_modules/archetypes/syd';
import Baroque from './polka_modules/archetypes/mozart';

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
  headParams: any,
  eyeParams: any,
  noseParams: any,
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


  polka.generate( { headParams, eyeParams, noseParams, archetypeParams } );

}

// ------------------------------------------------

export function model(

  headParams: any,
  eyeParams: any,
  noseParams: any,
  archetypeParams: any,

) {

  origin = view.center;

  polka.model( { headParams, eyeParams, noseParams, archetypeParams } );

}

// ------------------------------------------------

export function regenerate(

  headParams: any,
  eyeParams: any,
  noseParams: any,
  archetypeParams: any,

) {

  origin = view.center;

  console.log(`..... Regenerating Polka`);

  polka.clear();
  polka.generate( { headParams, eyeParams, noseParams, archetypeParams } );


}

