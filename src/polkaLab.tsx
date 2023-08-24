import { Layer } from 'paper';
import { paperScope } from './components/paperStage';

import {  testOrbitalFieldWithSpines } from './unit_tests/first-test'

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

		case 'PUNK': 
			_test = testOrbitalFieldWithSpines;
			break;

		case 'NERD':
			_test = testOrbitalFieldWithSpines;
			break;

		case 'BAROQUE':
			_test = testOrbitalFieldWithSpines;
			break;

		case 'MONK':
			_test = testOrbitalFieldWithSpines;
			break;

	}


	console.log(`..... Running test: ${polkaTest}`);

	if (_test) {

		test = _test;

	} else {

		//TODO: error message
	}


	test.generate({ testParams });

};


// ------------------------------------------------

export function model(

  testParams: any,

) {

  origin = view.center;

  const { count } = testParams;

  test( count );

};


// ------------------------------------------------

export function regenerate(

  testParams: any,

) {

  origin = view.center;

  console.log(`..... Regenerating Test. To be implemented`);


}





