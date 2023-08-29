import { useState, useEffect } from 'react';

import Stage from './components/stage'
import TestConsole from './components/consoles/testConsole';

import { reset, generate, regenerate, model } from './polkaLab';


const Lab = () => {


	interface Param {
				
		id: string;
		name: string;
		value: number;
		range: [number, number];
		step: number;
		label: string;
	}

	type ParamSet = Array<Param>;

	interface Model {

		option: string;
		label: string;
		console: string;
		params: ParamSet;
	}


	const testParams: ParamSet = [

		{ id: 'ogp1', name: 'count',  				value: 5, 		range: [1, 12], 	step: 1, 		label: "Attractor Count", },
		{ id: 'ogp2', name: 'splitAperture', 		value: 0.5, 	range: [0, 2], 		step: 0.01, 	label: "Split Aperture", },
		{ id: 'ogp3', name: 'radius', 				value: 100, 	range: [25, 300], 	step: 1, 		label: "radius", },
		{ id: 'ogp4', name: 'p4', 					value: 0, 		range: [-180, 180], step: 1, 		label: "Steer Angle", },
		{ id: 'ogp5', name: '', 					value: 1, 		range: [0, 2], 		step: 1, 		label: "Olga P5", },
		{ id: 'ogp6', name: '', 					value: 1, 		range: [0, 2], 		step: 1, 		label: "Olga P6", },
		{ id: 'ogp7', name: '', 					value: 1, 		range: [0, 2], 		step: 1, 		label: "Olga P7", },
	]


	const tests: any = [

		{ option: "TEST", label: "test", icon: "TEST", console: "TestConsole", params: testParams, default: false, checked: false },

	]

	const [isPaperLoaded, setIsPaperLoaded] = useState(false);

	const [test, setTest] = useState<Model | null>(null);
	const [paramsForTest, setParamsForTest] = useState<ParamSet | null>(null);

	const [scaleCtrl, setScaleCtrl] = useState(3);


	//-----------------------------------------------------------------------


	useEffect(() => { 

		if (isPaperLoaded) {

			const _archetypeParams: any = {};

			if (test === null) {

			} else {

				Array.from(test.params.values() || []).forEach((p: any) => {

					_archetypeParams[p.name] = p.value; 

				});	

			}


			model(_archetypeParams);
		}

	}, [ scaleCtrl, paramsForTest ]);


	//-----------------------------------------------------------------------

	function handleGenerateAction(selectedTest: any) {

		if (isPaperLoaded) {
			
			console.log(`ready to generate ${selectedTest.label}`);

			const _archetypeParams: any = {};

			Array.from(selectedTest.params.values() || []).forEach((p: any) => {

				_archetypeParams[p.name] = p.value; 

			});

			reset();
			generate( selectedTest.option, _archetypeParams );
			model(_archetypeParams);

			setTest(selectedTest);
			setParamsForTest(selectedTest.params);

		} else {

		}
	};


	function handleRegenerateAction(selectedTest: any) {

		if (isPaperLoaded) {
			
			console.log(`ready to regenerate ${selectedTest.label}`);

			const _archetypeParams: any = {};

			Array.from(selectedTest?.params.values() || []).forEach((p: any) => {

				_archetypeParams[p.name] = p.value; 

			});


			// reset();
			regenerate(_archetypeParams);
			model(_archetypeParams);


		} else {

		}

	};

	function handleParamCtrlInputForTest(updatedParams: ParamSet) {

		setParamsForTest(updatedParams);
	}	

	return (
        
		<div className={`relative w-3/4 h-[80vh] m-5 border border-slate-900`}>

		  	
			<div className={`w-full h-full`}>

				<Stage

					onPaperLoad={setIsPaperLoaded}
					options={tests}
					onGenerate={handleGenerateAction}
					onRegenerate={handleRegenerateAction}
				/>


			</div>


			<div className={`absolute top-0 left-0 max-w-[250px] h-fit h-[70vh] m-5 border border-slate-900`} > 

				{

					paramsForTest && (

						<TestConsole

							params={paramsForTest}
							inputHandler={handleParamCtrlInputForTest}
						/>

					)

				}


			</div>

		</div>

	)
}

export default Lab;
