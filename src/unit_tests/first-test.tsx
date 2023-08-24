import { Point, Path, Layer } from 'paper';
import { paperScope } from '../components/paperStage';

import HyperPoint from '../lib/topo/core/hyperPoint';
import Orbital from '../polka_modules/attractors/orbital';
import OrbitalField from '../polka_modules/attractors/orbitalField';
import Spine from '../polka_modules/attractors/spine';
import SpinalField from '../polka_modules/attractors/spinalField';

import { merge, measure, mid, curve } from '../lib/topo/tools/stitcher';

import { markPoint, genRandom, genRandomDec } from '../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


let view: any | null = null;
let layer: any | null = null;


function getView() {

	if ( paperScope ) {

		view = paperScope.project.view;
	}

	return view;
};

function getLayer() {

	if ( !layer ) {

		layer = new Layer()

	} 

	return layer;
};

function reset() {

	paperScope.project.clear();
	view = paperScope.project.view;
	layer = new Layer();
};



export function testOrbitalFieldWithSpines() {
  // Reset the canvas
  reset();

  // Get the view and layer
  const view = getView();
  const layer = getLayer();

  // Define the position as an HyperPoint
  const position = new HyperPoint(view.center.x, view.center.y);

// Define the size for the OrbitalField
  const size = 100;

  // Create an OrbitalField
  const orbitalField = new OrbitalField(position, size);

  // Define the parameters for the Spine attractors
  const spineLength = 50;

  // Define the number of Spines to test
  const spineCounts = [1, 2, 3, 10, 15];

  // Iterate through the spineCounts and add Spines to the OrbitalField
  for (const count of spineCounts) {
    for (let i = 0; i < count; i++) {
      // Create a Spine with required parameters
      const spine = new Spine( spineLength, position );

      // Add the Spine to the OrbitalField
      orbitalField.addAttractor(spine);
    }

    // Log the result or perform assertions
    console.log(`OrbitalField with ${count} Spines drawn successfully.`);

    // Reset the canvas for the next iteration
    reset();
  }
}
