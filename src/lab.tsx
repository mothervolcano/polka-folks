import { useState, useEffect } from 'react';

import Stage from './components/stage'
import Button from './components/ui/button';
import TestConsole from './components/consoles/testConsole';

import ArchetypeGenerationModal from './components/modals/archetypeGenerationModal';

import { reset, generate, regenerate, model, save } from './testGenerator';


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
		console: any;
		params: ParamSet;
	}


	const testParams: ParamSet = [

		{ id: 'ogp1', name: 'count',  				value: 5, 		range: [1, 12], 	step: 1, 		label: "Attractor Count", },
		{ id: 'ogp2', name: 'splitAperture', 		value: 0.5, 	range: [0, 2], 		step: 0.01, 	label: "Split Aperture", },
		{ id: 'ogp3', name: 'radius', 				value: 100, 	range: [25, 300], 	step: 1, 		label: "radius", },
		{ id: 'ogp4', name: 'p4', 					value: 0, 		range: [-180, 180], step: 1, 		label: "Steer Angle", },
		{ id: 'ogp5', name: 'p5', 					value: 0, 		range: [0, 1], 		step: 0.01, 	label: "P5", },
		{ id: 'ogp6', name: 'p6', 					value: 0, 		range: [0, 1], 		step: 0.01, 		label: "P6", },
		{ id: 'ogp7', name: 'p7', 					value: 0, 		range: [0, 1], 		step: 0.01, 		label: "P7", },
		{ id: 'ogp8', name: 'p8', 					value: 0, 		range: [0, 1], 		step: 0.01, 		label: "P8", },
	]


	const tests: any = [

		{ option: "ORBITAL_SPINES", 			label: "Spines in Orbital Field", 			icon: "TEST", console: TestConsole, params: testParams, default: false, checked: false },
		{ option: "ORBITAL_ORBITALS", 			label: "Orbitals in Orbital Field", 		icon: "TEST", console: TestConsole, params: testParams, default: false, checked: false },
		{ option: "ORBITAL_ORBITAL_FIELDS", 	label: "Orbital Fields in Orbital Field", 	icon: "TEST", console: TestConsole, params: testParams, default: false, checked: false },
		{ option: "SPINE_SPINES", 				label: "Spines in Spinal Field", 			icon: "TEST", console: TestConsole, params: testParams, default: false, checked: false },
		{ option: "SPINE_ORBITALS", 			label: "Orbitals in Spinal Field", 			icon: "TEST", console: TestConsole, params: testParams, default: false, checked: false },
	]

	const [isPaperLoaded, setIsPaperLoaded] = useState(false);

	const [ initialized, setInitialized ] = useState(false);

	const [ inTestGenerationScreen, setInTestGenerationScreen ] = useState<boolean>( true );

	const [currentTest, setCurrentTest] = useState<Model | null>(null);
	const [paramsForTest, setParamsForTest] = useState<ParamSet | null>(null);

	const [scaleCtrl, setScaleCtrl] = useState(3);


	//-----------------------------------------------------------------------


	useEffect(() => { 

		if (isPaperLoaded) {

			const _archetypeParams: any = {};

			if (currentTest === null) {

			} else {

				Array.from(currentTest.params.values() || []).forEach((p: any) => {

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

			setCurrentTest(selectedTest);
			setParamsForTest(selectedTest.params);

			setInTestGenerationScreen( false );

			if ( !initialized ) { setInitialized(true) };

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
	};


	// ----------------------------------------------
	// UI HANDLERS

	function handleNewTestAction() {

		setInTestGenerationScreen( true );
	}

	function handleSaveAction() {

		save();
	}


	// ------------------------------------------------------------------------


	function switchConsole( test: Model ) {

		const TestConsole = test.console;

		return ( <TestConsole  params={paramsForTest} inputHandler={handleParamCtrlInputForTest} /> )
	}

		

	return (
        
		<div className={`relative w-3/4 h-[80vh] m-5 border border-slate-900`}>

		  	
			<div className={`w-full h-full`}>

				<Stage

					onPaperLoad={setIsPaperLoaded}
				/>

			</div>

			<div className={`absolute top-0 left-0 w-full h-full`}>
        		
        		{

        			inTestGenerationScreen && (

        				<ArchetypeGenerationModal 

        					initialized={ initialized }
        					options={ tests }
        					onGenerate={ handleGenerateAction }
        					onClose={ () => setInTestGenerationScreen(false) }
        				/>

        			)
        		}

        	</div>


			<div className={`absolute top-0 left-0  max-w-[250px] isDesktopOrLaptop h-fit m-5 border border-slate-900`} > 

		    	{
		    		currentTest && !inTestGenerationScreen && switchConsole( currentTest )
		    	}

		    </div>

		    <div className={`absolute top-0 right-0 m-2`}>
		    	
		    	{

		    		!inTestGenerationScreen && (

			    		<div>

				    		<Button		
								labelText="new"
								onClickEventHandler={ handleNewTestAction }
							/>

							<Button		
								labelText="export"
								onClickEventHandler={ handleSaveAction }
							/>

			    		</div>
					)
		    	}

		    </div>

		</div>

	)
}

export default Lab;
