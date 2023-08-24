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



export function testOrbitalFieldWithSpines(spineCount: number) {
  // Create an instance of OrbitalField with required parameters
  const position = new paper.Point(100, 100);
  const radius = 50;
  const orbitalField = new OrbitalField(position, radius);

  // Add the specified number of Spine attractors with required parameters
  for (let i = 0; i < spineCount; i++) {
    const start = new paper.Point(10 * i, 10 * i);
    const end = new paper.Point(20 * i, 20 * i);
    const spine = new Spine(start, end);
    orbitalField.addAttractor(spine);
  }

  // Check if the count of Spine attractors is correct
  const actualSpineCount = orbitalField.attractors.filter(attractor => attractor instanceof Spine).length;
  if (actualSpineCount === spineCount) {
    console.log(`Test passed for ${spineCount} Spine attractors.`);
  } else {
    console.error(`Test failed for ${spineCount} Spine attractors. Expected ${spineCount}, but got ${actualSpineCount}.`);
  }
}

// Run the test with different numbers of Spine attractors
testOrbitalFieldWithSpines(1);
testOrbitalFieldWithSpines(2);
testOrbitalFieldWithSpines(3);
testOrbitalFieldWithSpines(10);
testOrbitalFieldWithSpines(15);
