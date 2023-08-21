
import Orbital from './polka_modules/attractors/orbital'
import OrbitalField from './polka_modules/attractors/orbitalField'
import SpinalField from './polka_modules/attractors/spinalField'
import Spine from './polka_modules/attractors/spine'
import Eclipse from './polka_modules/attractors/eclipse'
import EclipseField from './polka_modules/attractors/eclipseField'

// import Head from './models/head'

import Nerd from './polka_modules/archetypes/olga';
import Punk from './polka_modules/archetypes/syd';
import Baroque from './polka_modules/archetypes/mozart';
import Monk from './polka_modules/archetypes/monk';

import DebugDot from './lib/topo/utils/debugDot'

import { markPoint } from './lib/topo/utils/helpers';

declare const paper: any;

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



let view: any
let layer: any
let origin: any

let polka: any


export function reset() {

  // if ( polka ) {

  //   polka.clear();

  // } else {

  //   paper.project.clear();
  //   view = paper.project.view
  //   layer = new paper.Layer()

  // }

    paper.project.clear();
    view = paper.project.view
    layer = new paper.Layer()
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

    case 'MONK':
      _archetype = Monk;
    break;

  }

  console.log(`..... Generating Polka: ${archetype}`);

  polka = new _archetype( origin, 100 );

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

