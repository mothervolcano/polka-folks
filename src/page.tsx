
import { useMediaQuery } from 'react-responsive';

import { useState, useEffect } from 'react';

import Stage from './components/stage'
import Console from './components/console';

import { reset, generate, regenerate, model } from './polkafolks';


const Page = () => {


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
		console: string;
		params: ParamSet;
	}


	const monkParams: ParamSet = [

		{ id:'mkp1', 	name: 'numCtrl',		value: 5, 		range: [2,15], 		step: 1, 		label: "Monk P1", },
		{ id:'mkp2', 	name: 'empty',			value: 3,		range: [1,10], 		step: 1, 		label: "Monk P2", },
		{ id:'mkp3', 	name: 'latCtrl',		value: 1, 		range: [0,2], 		step: 0.01, 	label: "Monk P3", },
		{ id:'mkp4', 	name: 'cutoffCtrl',		value: 0.5, 	range: [0,2], 		step: 0.01, 	label: "Monk P4", },
		{ id:'mkp5', 	name: 'volCtrl',		value: 1, 		range: [0,2], 		step: 0.01, 	label: "Monk P5", },
		{ id:'mkp6', 	name: 'roundnessCtrl',	value: 1, 		range: [0,2], 		step: 0.01, 	label: "Monk P6", },
		{ id:'mkp7', 	name: 'indentCtrl',		value: 1, 		range: [0,2], 		step: 0.01, 	label: "Monk P7", },
	]

	const nerdParams: ParamSet = [

		{ id:'ogp1', 	name: 'splitLat', 		value: 1, 		range: [0,2], 		step: 0.01, 	label: "Split Drop", },
		{ id:'ogp2', 	name: 'splitAperture', 	value: 0.5,		range: [0,2], 		step: 0.01, 	label: "Split Aperture", },
		{ id:'ogp3', 	name: '', 				value: 1, 		range: [0,2], 		step: 1, 	 	label: "Olga P3", },
		{ id:'ogp4', 	name: '', 				value: 0.5, 	range: [0,2], 		step: 1, 	 	label: "Olga P4", },
		{ id:'ogp5', 	name: '', 				value: 1, 		range: [0,2], 		step: 1, 	 	label: "Olga P5", },
		{ id:'ogp6', 	name: '', 				value: 1, 		range: [0,2], 		step: 1, 	 	label: "Olga P6", },
		{ id:'ogp7', 	name: '', 				value: 1, 		range: [0,2], 		step: 1, 	 	label: "Olga P7", },
	]

	const punkParams: ParamSet = [

		{ id:'syp1', 	name: 'spikeNumCtrl',		value: 5, 		range: [1,15],		step: 1, 		label: "Spike Number", },
		{ id:'syp5', 	name: 'shaveDotsDensity',	value: 5, 		range: [3,10],		step: 1, 		label: "Shaved Head", },
		{ id:'syp2', 	name: 'spikeLengthCtrl',	value: 1,		range: [0,2],		step: 0.01, 	label: "Spike Height", },
		{ id:'syp3', 	name: 'spikeSpreadCtrl',	value: 0.5, 	range: [0,1],		step: 0.01, 	label: "Spike Spread", },
		{ id:'syp4', 	name: 'shrinkRateCtrl',		value: 0, 		range: [0,1],		step: 0.01, 	label: "Spike Shrink Rate", },
		{ id:'syp6', 	name: 'spikeSharpnessCtrl',	value: 1, 		range: [0,2],		step: 0.01, 	label: "Spike Sharpness", },
		{ id:'syp7', 	name: '',					value: 1, 		range: [0,2],		step: 0.01, 	label: "Syd P7", },
	]

	const baroqueParams: ParamSet = [

		{ id:'mzp4', 	name: 'curlNumCtrl', 		value: 2, 		range: [1,6],		step: 1, 		label: "Curls", },
		{ id:'mzp5', 	name: '', 					value: 1, 		range: [0,2],		step: 0.01, 	label: "Mozart P5", },
		{ id:'mzp1', 	name: 'heightCtrl', 		value: 0.5, 	range: [0,1],		step: 0.01, 	label: "Height", },
		{ id:'mzp7', 	name: 'volCtrl', 			value: 0.5, 	range: [0,1],		step: 0.01, 	label: "Volume", },
		{ id:'mzp2', 	name: 'hairlineLevelCtrl', 	value: 0.5,		range: [0,2],		step: 0.01, 	label: "Hairline Level", },
		{ id:'mzp3', 	name: 'hairlineRidgeCtrl', 	value: 1, 		range: [0,2],		step: 0.01, 	label: "Hairline Ridge", },
		{ id:'mzp6', 	name: 'spanCtrl', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Span", },
	]


	const headParams: ParamSet = [

		{ id:'hp1', 	name: '', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Ears Size", },
		{ id:'hp2', 	name: '', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Ears Height", },
		{ id:'hp3', 	name: '', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "...", },
	]


	const eyeParams: ParamSet = [

		{ id:'eyep1', 	name: 'eyeScaleCtrl', 				value: 1, 		range: [0,2],		step: 0.01, 	label: "Eye Size", },
		{ id:'eyep2', 	name: 'eyeDistanceCtrl', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Eye Distance", },
		{ id:'eyep3', 	name: 'eyeRoundnessCtrl', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Eye Roundness", },
		{ id:'eyep4', 	name: 'pTest', 						value: 1, 		range: [0,2],		step: 0.01, 	label: "p test 1", },
		{ id:'eyep5', 	name: 'pTest2', 					value: 0, 		range: [-1,1],		step: 0.01, 	label: "p test 2", },
	]


	const noseParams: ParamSet = [

		{ id:'nsp1', 	name: 'noseLengthCtrl', 			value: 1, 		range: [0,2],		step: 0.01, 	label: "Nose Length", },
		{ id:'nsp2', 	name: 'noseScaleCtrl', 				value: 1, 		range: [0,2],		step: 0.01, 	label: "Nose Size", },
		{ id:'nsp3', 	name: 'noseWidthCtrl', 				value: 0, 		range: [0,2],		step: 0.01, 	label: "Nose Width", },
	]


	const archetypes: any = [

		{ option: "PUNK", 		label: "Punk", 		icon: "TEST", 	console: "PunkConsole", 	params: punkParams, 			default: false, checked: false },
		{ option: "BAROQUE", 	label: "Baroque", 	icon: "TEST", 	console: 'BaroqueConsole', 	params: baroqueParams, 			default: false, checked: false },
		{ option: "NERD", 		label: "Nerd", 		icon: "TEST", 	console: 'NerdConsole', 	params: nerdParams, 			default: false, checked: false },
		{ option: "MONK", 		label: "Monk", 		icon: "TEST", 	console: 'MonkConsole', 	params: monkParams, 			default: false, checked: false },
		{ option: "BILLY", 		label: "Billy", 	icon: "TEST", 	console:"", 				params: '', 					default: false, checked: false },
		{ option: "RAGNAR", 	label: "Ragnar", 	icon: "TEST", 	console: "", 				params: '', 					default: false, checked: false }

	]


	const [ isDesktopOrLaptop, setIsDesktopOrLaptop ] = useState(false);
	const [ isPaperLoaded, setIsPaperLoaded ] = useState(false);

	const [ paramsForHead, setParamsForHead ] = useState< ParamSet >( headParams );
	const [ paramsForEyes, setParamsForEyes ] = useState< ParamSet >( eyeParams );
	const [ paramsForNose, setParamsForNose ] = useState< ParamSet >( noseParams );

	const [ archetype, setArchetype ] = useState< Model | null >(null);
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
			const _headParams: any = {};
			const _eyeParams: any = {};
			const _noseParams: any = {};

			if ( archetype === null ) {

			} else {

				Array.from(archetype.params.values() || []).forEach( (p: any) => {

					_archetypeParams[p.name] = p.value; 

				});	

			}


			Array.from(paramsForEyes?.values() || []).forEach( (p: any) => {

				_eyeParams[p.name] = p.value;
			});

			Array.from(paramsForNose?.values() || []).forEach( (p: any) => {

				_noseParams[p.name] = p.value;
			}); 

			model( _headParams, _eyeParams, _noseParams, _archetypeParams  );
		}

	}, [ scaleCtrl, paramsForNose, paramsForEyes, paramsForArchetype ] );


	//-----------------------------------------------------------------------



	function handleGenerateAction( selectedArchetype: any ) {

		if ( isPaperLoaded ) {
			
			console.log(`ready to generate ${ selectedArchetype.label }`);

			const _archetypeParams: any = {};
			const _headParams: any = {};
			const _eyeParams: any = {};
			const _noseParams: any = {};

			Array.from(selectedArchetype.params.values() || []).forEach( (p: any) => {

				_archetypeParams[p.name] = p.value; 

			});
			
			Array.from(paramsForEyes.values() || []).forEach( (p: any) => {

				_eyeParams[p.name] = p.value;
			});

			Array.from(paramsForNose.values() || []).forEach( (p: any) => {

				_noseParams[p.name] = p.value;
			});


			reset();
			generate( selectedArchetype.option, _headParams, _eyeParams, _noseParams, _archetypeParams  );
			model( _headParams, _eyeParams, _noseParams, _archetypeParams );

			setArchetype( selectedArchetype );
			setParamsForArchetype( selectedArchetype.params );

		} else {

		}
	};


	function handleRegenerateAction( selectedArchetype: any ) {

		if ( isPaperLoaded ) {
			
			console.log(`ready to regenerate ${ selectedArchetype.label }`);

			const _archetypeParams: any = {};
			const _headParams: any = {};
			const _eyeParams: any = {};
			const _noseParams: any = {};

			Array.from(selectedArchetype?.params.values() || []).forEach( (p: any) => {

				_archetypeParams[p.name] = p.value; 

			});

			Array.from(paramsForEyes.values() || []).forEach( (p: any) => {

				_eyeParams[p.name] = p.value;
			});

			Array.from(paramsForNose.values() || []).forEach( (p: any) => {

				_noseParams[p.name] = p.value;
			});


			// reset();
			regenerate( _headParams, _eyeParams, _noseParams, _archetypeParams );
			model( _headParams, _eyeParams, _noseParams, _archetypeParams );


		} else {

		}
	};


	function handleParamCtrlInputForArchetype( updatedParams: ParamSet ) {

		setParamsForArchetype( updatedParams );
	}	

	function handleParamCtrlInputForHead( updatedParams: ParamSet ) {

		setParamsForHead( updatedParams );
	}	

	function handleParamCtrlInputForEyes( updatedParams: ParamSet ) {

		setParamsForEyes( updatedParams );
	}	

	function handleParamCtrlInputForNose( updatedParams: ParamSet ) {

		setParamsForNose( updatedParams );
	}


	return (
        
        <div className={`relative w-3/4 h-[80vh] m-5 border border-slate-900`}>

		  	
		  	<div className={`w-full h-full`}>

				{ isDesktopOrLaptop && (

                    <Stage

                    	onPaperLoad={setIsPaperLoaded}
		    			options={archetypes}
		    			onGenerate={handleGenerateAction}
		    			onRegenerate={handleRegenerateAction}
                    />

				)}

		    </div>


		    <div className={`absolute ${ isDesktopOrLaptop ? "top-0" : "top-0" } left-0 ${ isDesktopOrLaptop ? "max-w-[250px]" : "w-full" } ${ isDesktopOrLaptop ? "h-fit" : "h-[70vh]" } m-5 border border-slate-900`} > 

		    	<Console

		    		archetype={archetype}
		    		paramsForArchetype={paramsForArchetype}
		    		paramsForHead={paramsForHead}
		    		paramsForEyes={paramsForEyes}
		    		paramsForNose={paramsForNose}
		    		archetypeInputHandler={handleParamCtrlInputForArchetype}
		    		headInputHandler={handleParamCtrlInputForHead}
		    		eyesInputHandler={handleParamCtrlInputForEyes}
		    		noseInputHandler={handleParamCtrlInputForNose}
		    	/>

	    		{ !isDesktopOrLaptop && (


    				<Stage 

		    			onPaperLoad={setIsPaperLoaded}
		    			options={archetypes}
		    			onGenerate={handleGenerateAction}
		    			onRegenerate={handleRegenerateAction}
		    		/>

	    		)}

		    </div>

		</div>

	)
};


export default Page;

