import { Point, Path, Layer } from 'paper';

import HyperPoint from '../lib/topo/core/hyperPoint';
import Orbital from '../polka_modules/attractors/orbital';
import OrbitalField from '../polka_modules/attractors/orbitalField';
import Spine from '../polka_modules/attractors/spine';
import SpinalField from '../polka_modules/attractors/spinalField';

import { merge, measure, mid, curve } from '../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../lib/topo/utils/helpers';
import { convertToSegment } from '../lib/topo/utils/converters';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



// export function testOrbitalFieldWithSpines( pos: any, count: number = 5 ) {


//   // Define the position as an HyperPoint
//   const position = new HyperPoint(pos);

// // Define the size for the OrbitalField
//   const size = 100;

//   // Define the parameters for the Spine attractors
//   const spineLength = 50;

//   // Define the number of Spines to test
//   const posOffsets = [0, 1, 2 ];

//   // Iterate through the spineCounts and add Spines to the OrbitalField
//   for (const offset of posOffsets) {

//      // Create an OrbitalField
//     const orbitalField = new OrbitalField(position, size);
//     orbitalField.moveBy( offset*size*2.50, 'HOR' );

//     for (let i = 0; i < count; i++) {
//       // Create a Spine with required parameters
//       const spine = new Spine( spineLength, position );

//       // Add the Spine to the OrbitalField
//       orbitalField.addAttractor(spine);
//     }

//     // Log the result or perform assertions
//     console.log(`OrbitalField with ${count} Spines drawn successfully.`);

//   }

// }



export function testOrbitalFieldWithSpines( pos: any, params: any ) {


  const { radius=100, count=5, p4=0 } = params;


  const position = new HyperPoint(pos);
  const size = radius;
  const spineLength = radius/2;

  const orbitalField = new OrbitalField(position, size);

  const spines = [];

  for (let i = 0; i < count; i++) {

    spines.push( new Spine( spineLength ) );

  }

  orbitalField.addAttractors( spines );

  // ---------------------

  const path = new Path({

    strokeColor: DEBUG_GREEN,
    closed: true

  })

  // --------------------

  const pts = orbitalField.locate( 1 );

  for ( let i = 0; i<count; i++ ) {

    pts[i].steer(p4);

    const pt = convertToSegment( pts[i] );

    path.add( pt );
  }

}




