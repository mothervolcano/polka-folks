import { Layer } from 'paper';
import { paperScope } from './components/paperStage';

import {  
					testOrbitalFieldWithSpines, 
					testOrbitalFieldWithOrbitals, 
					testOrbitalFieldWithOrbitalFields,
					testSpinalFieldWithSpines,
					testSpinalFieldWithOrbitals

				} from './unit_tests/first-test'

import { markPoint } from './lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



let view: any
let layer: any
let origin: any

let test: any


export function reset() {

	paperScope.project.clear();
	view = paperScope.project.view
	layer = new Layer()
};


export function generate(
  
	polkaTest: string,
	testParams: any,

) {

	// initLibrary( paper )

	origin = view.center;
	
	let _test;

	switch (polkaTest) {

		case 'ORBITAL_SPINES': 
			_test = testOrbitalFieldWithSpines;
			break;		
		case 'ORBITAL_ORBITALS': 
			_test = testOrbitalFieldWithOrbitals;
			break;		
		case 'ORBITAL_ORBITAL_FIELDS': 
			_test = testOrbitalFieldWithOrbitalFields;
			break;
		case 'SPINE_SPINES': 
			_test = testSpinalFieldWithSpines;
			break;
		case 'SPINE_ORBITALS': 
			_test = testSpinalFieldWithOrbitals;
			break;
	}


	console.log(`..... Running test: ${polkaTest}`);

	if (_test) {

		test = _test;

	} else {

		//TODO: error message
	}

	reset();

	test( origin, testParams );

};


// ------------------------------------------------

export function model(

  testParams: any,

) {


  reset()
	test( origin, testParams );

};


// ------------------------------------------------

export function regenerate(

  testParams: any,

) {

  origin = view.center;

  console.log(`..... Regenerating Test. To be implemented`);


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





