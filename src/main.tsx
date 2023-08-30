
import { useMediaQuery } from 'react-responsive';

import { useState, useEffect } from 'react';

import Stage from './components/stage';
import Button from './components/ui/button';
import NerdConsole from './components/consoles/nerdConsole';
import BaroqueConsole from './components/consoles/baroqueConsole';
import PunkConsole from './components/consoles/punkConsole';

import ArchetypeGenerationModal from './components/modals/archetypeGenerationModal';

import { reset, generate, regenerate, model } from './polkaGenerator';


const Main = () => {


	interface Param {
				
		id: string;
		name: string;
		value: number;
		range: [number,number];
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


	const nerdParamsSchema: ParamSet = [

		{ id:'ogp1', 	name: 'splitLat', 		value: 1, 		range: [0,2], 		step: 0.01, 	label: "Split Drop", },
		{ id:'ogp2', 	name: 'splitAperture', 	value: 0.5,		range: [0,2], 		step: 0.01, 	label: "Split Aperture", },
		{ id:'ogp3', 	name: '', 				value: 1, 		range: [0,2], 		step: 1, 	 	label: "Olga P3", },
		{ id:'ogp4', 	name: '', 				value: 0.5, 	range: [0,2], 		step: 1, 	 	label: "Olga P4", },
		{ id:'ogp5', 	name: '', 				value: 1, 		range: [0,2], 		step: 1, 	 	label: "Olga P5", },
		{ id:'ogp6', 	name: '', 				value: 1, 		range: [0,2], 		step: 1, 	 	label: "Olga P6", },
		{ id:'ogp7', 	name: '', 				value: 1, 		range: [0,2], 		step: 1, 	 	label: "Olga P7", },
	]

	const punkParamsSchema: ParamSet = [

		{ id:'syp1', 	name: 'spikeNumCtrl',		value: 5, 		range: [1,15],		step: 1, 		label: "Spike Number", },
		{ id:'syp5', 	name: 'shaveDotsDensity',	value: 5, 		range: [3,10],		step: 1, 		label: "Shaved Head", },
		{ id:'syp2', 	name: 'spikeLengthCtrl',	value: 1,		range: [0,2],		step: 0.01, 	label: "Spike Height", },
		{ id:'syp3', 	name: 'spikeSpreadCtrl',	value: 0.5, 	range: [0,1],		step: 0.01, 	label: "Spike Spread", },
		{ id:'syp4', 	name: 'shrinkRateCtrl',		value: 0, 		range: [0,1],		step: 0.01, 	label: "Spike Shrink Rate", },
		{ id:'syp6', 	name: 'spikeSharpnessCtrl',	value: 1, 		range: [0,2],		step: 0.01, 	label: "Spike Sharpness", },
		{ id:'syp7', 	name: '',					value: 1, 		range: [0,2],		step: 0.01, 	label: "Syd P7", },
	]

	const baroqueParamsSchema: ParamSet = [

		{ id:'mzp4', 	name: 'curlNumCtrl', 		value: 2, 		range: [1,6],		step: 1, 		label: "Curls", },
		{ id:'mzp5', 	name: '', 					value: 1, 		range: [0,2],		step: 0.01, 	label: "Mozart P5", },
		{ id:'mzp1', 	name: 'heightCtrl', 		value: 0.5, 	range: [0,1],		step: 0.01, 	label: "Height", },
		{ id:'mzp7', 	name: 'volCtrl', 			value: 0.5, 	range: [0,1],		step: 0.01, 	label: "Volume", },
		{ id:'mzp2', 	name: 'hairlineLevelCtrl', 	value: 0.5,		range: [0,2],		step: 0.01, 	label: "Hairline Level", },
		{ id:'mzp3', 	name: 'hairlineRidgeCtrl', 	value: 1, 		range: [0,2],		step: 0.01, 	label: "Hairline Ridge", },
		{ id:'mzp6', 	name: 'spanCtrl', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Span", },
	]


	const baseParamSchema: ParamSet = [

		{ id:'hp1', 	name: '', 							value: 1, 		range: [0,2],		step: 0.01, 	label: "Ears Size", },
		{ id:'hp2', 	name: '', 							value: 1, 		range: [0,2],		step: 0.01, 	label: "Ears Height", },
		{ id:'hp3', 	name: '', 							value: 1, 		range: [0,2],		step: 0.01, 	label: "...", },
		{ id:'eyep1', 	name: 'eyeScaleCtrl', 				value: 1, 		range: [0,2],		step: 0.01, 	label: "Eye Size", },
		{ id:'eyep2', 	name: 'eyeDistanceCtrl', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Eye Distance", },
		{ id:'eyep3', 	name: 'eyeRoundnessCtrl', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Eye Roundness", },
		{ id:'eyep4', 	name: 'pTest', 						value: 1, 		range: [0,2],		step: 0.01, 	label: "p test 1", },
		{ id:'eyep5', 	name: 'pTest2', 					value: 0, 		range: [-1,1],		step: 0.01, 	label: "p test 2", },
		{ id:'nsp1', 	name: 'noseLengthCtrl', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Nose Length", },
		{ id:'nsp2', 	name: 'noseScaleCtrl', 				value: 1, 		range: [0,2],		step: 0.01, 	label: "Nose Size", },
		{ id:'nsp3', 	name: 'noseWidthCtrl', 				value: 0, 		range: [0,2],		step: 0.01, 	label: "Nose Width", },
	]


	const archetypes: any = [

		{ option: "PUNK", 		label: "Punk", 		icon: "TEST", 	console: PunkConsole, 		params: punkParamsSchema, 			default: false, 	checked: false },
		{ option: "BAROQUE", 	label: "Baroque", 	icon: "TEST", 	console: BaroqueConsole, 	params: baroqueParamsSchema, 		default: false, 	checked: false },
		{ option: "NERD", 		label: "Nerd", 		icon: "TEST", 	console: NerdConsole, 		params: nerdParamsSchema, 			default: false, 	checked: false },
	]


	const [ isDesktopOrLaptop, setIsDesktopOrLaptop ] = useState(false);
	const [ isPaperLoaded, setIsPaperLoaded ] = useState(false);

	const [ initialized, setInitialized ] = useState(false);

	const [ inArchetypeGenerationScreen, setInArchetypeGenerationScreen ] = useState<boolean>( true );

	const [ baseParams, setBaseParams ] = useState< ParamSet >( baseParamSchema );

	const [ currentArchetype, setCurrentArchetype ] = useState< Model | null >(null);
	const [ paramsForArchetype, setParamsForArchetype ] = useState< ParamSet | null >( null );

	const [ scaleCtrl, setScaleCtrl ] = useState(3);

	const _isDesktopOrLaptop = useMediaQuery({
    	
    	query: '(min-width: 1224px)'
  	});


	//-----------------------------------------------------------------------

	
	useEffect( () => {

		setIsDesktopOrLaptop( _isDesktopOrLaptop );

	}, [] );


	useEffect( () => { 

		if ( isPaperLoaded ) {

			// reset();
			const _archetypeParams: any = {};
			const _baseParams: any = {};

			if ( currentArchetype === null ) {

			} else {

				Array.from(currentArchetype.params.values() || []).forEach( (p: any) => {

					_archetypeParams[p.name] = p.value; 

				});	
			}

			Array.from(baseParams?.values() || []).forEach( (p: any) => {

				_baseParams[p.name] = p.value;
			});

			model( _baseParams, _archetypeParams  );
		}

	}, [ scaleCtrl, baseParams, paramsForArchetype ] );


	//-----------------------------------------------------------------------



	function handleGenerateAction( selectedArchetype: any ) {

		if ( isPaperLoaded ) {
			
			console.log(`ready to generate ${ selectedArchetype.label }`);

			const _archetypeParams: any = {};
			const _baseParams: any = {};

			Array.from(selectedArchetype.params.values() || []).forEach( (p: any) => {

				_archetypeParams[p.name] = p.value; 

			});
			
			Array.from(baseParams.values() || []).forEach( (p: any) => {

				_baseParams[p.name] = p.value;
			});


			reset();
			generate( selectedArchetype.option, _baseParams, _archetypeParams  );
			model( _baseParams, _archetypeParams );

			setCurrentArchetype( selectedArchetype );
			setParamsForArchetype( selectedArchetype.params );

			setInArchetypeGenerationScreen( false );

			if ( !initialized ) { setInitialized(true) };

		} else {

		}
	};


	function handleRegenerateAction() {

		if ( isPaperLoaded && currentArchetype ) {
			
			console.log(`ready to regenerate ${ currentArchetype.label }`);

			const _archetypeParams: any = {};
			const _baseParams: any = {};

			Array.from(currentArchetype?.params.values() || []).forEach( (p: any) => {

				_archetypeParams[p.name] = p.value; 

			});

			Array.from(baseParams.values() || []).forEach( (p: any) => {

				_baseParams[p.name] = p.value;
			});

			// reset();
			regenerate( _baseParams, _archetypeParams );
			model( _baseParams, _archetypeParams );

		} else {

		}
	};


	function handleParamCtrlInputForArchetype( updatedParams: ParamSet ) {

		setParamsForArchetype( updatedParams );
	};	


	// ----------------------------------------------
	// UI HANDLERS

	function handleNewArchetypeAction() {

		setInArchetypeGenerationScreen( true );
	}


	// ------------------------------------------------------------------------


	function switchConsole( archetype: Model ) {

		const ArchetypeConsole = archetype.console;

		return ( <ArchetypeConsole  params={paramsForArchetype} inputHandler={handleParamCtrlInputForArchetype} /> )
	}


	return (
        
        <div className={`relative w-3/4 h-[80vh] m-5 border border-slate-900`}>
		  	
		  	<div className={`w-full h-full`}>

				{ isDesktopOrLaptop && (

                    <Stage

                    	onPaperLoad={setIsPaperLoaded}
                    />

				)}

		    </div>


		    <div className={`absolute top-0 left-0 w-full h-full`}>
        		
        		{

        			isDesktopOrLaptop && inArchetypeGenerationScreen && (

        				<ArchetypeGenerationModal 

        					initialized={ initialized }
        					options={ archetypes }
        					onGenerate={ handleGenerateAction }
        					onClose={ () => setInArchetypeGenerationScreen(false) }
        				/>

        			)
        		}

        	</div>


        	<div className={`absolute ${ isDesktopOrLaptop ? "top-0" : "top-0" } left-0 ${ isDesktopOrLaptop ? "max-w-[250px]" : "w-full" } ${ isDesktopOrLaptop ? "h-fit" : "h-[70vh]" } m-5 border border-slate-900`} > 


		    	{
		    		currentArchetype && !inArchetypeGenerationScreen && switchConsole( currentArchetype )
		    	}

		    </div>


		    <div className={`absolute top-0 right-0 m-2`}>
		    	
		    	{

		    		!inArchetypeGenerationScreen && (

			    		<Button		
							labelText="new"
							onClickEventHandler={ handleNewArchetypeAction }
						/>
					)
		    	}

		    </div>


		    <div className={`absolute bottom-0 right-0 m-2`}>

		    	{

		    		!inArchetypeGenerationScreen && currentArchetype && (

						<Button	
							labelText="regenerate"
							onClickEventHandler={ handleRegenerateAction }
						/>
		    		)
		    	}
			
			</div>

		</div>

	)
};


export default Main;

