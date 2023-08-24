import { useState, useEffect } from 'react';

import Stage from './components/stage'
import Console from './components/console';

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


	const nerdParams: ParamSet = [

		{ id: 'ogp1', name: 'splitLat', value: 1, range: [0, 2], step: 0.01, label: "Split Drop", },
		{ id: 'ogp2', name: 'splitAperture', value: 0.5, range: [0, 2], step: 0.01, label: "Split Aperture", },
		{ id: 'ogp3', name: '', value: 1, range: [0, 2], step: 1, label: "Olga P3", },
		{ id: 'ogp4', name: '', value: 0.5, range: [0, 2], step: 1, label: "Olga P4", },
		{ id: 'ogp5', name: '', value: 1, range: [0, 2], step: 1, label: "Olga P5", },
		{ id: 'ogp6', name: '', value: 1, range: [0, 2], step: 1, label: "Olga P6", },
		{ id: 'ogp7', name: '', value: 1, range: [0, 2], step: 1, label: "Olga P7", },
	]

	const punkParams: ParamSet = [

		{ id: 'syp1', name: 'spikeNumCtrl', value: 5, range: [1, 15], step: 1, label: "Spike Number", },
		{ id: 'syp5', name: 'shaveDotsDensity', value: 5, range: [3, 10], step: 1, label: "Shaved Head", },
		{ id: 'syp2', name: 'spikeLengthCtrl', value: 1, range: [0, 2], step: 0.01, label: "Spike Height", },
		{ id: 'syp3', name: 'spikeSpreadCtrl', value: 0.5, range: [0, 1], step: 0.01, label: "Spike Spread", },
		{ id: 'syp4', name: 'shrinkRateCtrl', value: 0, range: [0, 1], step: 0.01, label: "Spike Shrink Rate", },
		{ id: 'syp6', name: 'spikeSharpnessCtrl', value: 1, range: [0, 2], step: 0.01, label: "Spike Sharpness", },
		{ id: 'syp7', name: '', value: 1, range: [0, 2], step: 0.01, label: "Syd P7", },
	]

	const baroqueParams: ParamSet = [

		{ id: 'mzp4', name: 'curlNumCtrl', value: 2, range: [1, 6], step: 1, label: "Curls", },
		{ id: 'mzp5', name: '', value: 1, range: [0, 2], step: 0.01, label: "Mozart P5", },
		{ id: 'mzp1', name: 'heightCtrl', value: 0.5, range: [0, 1], step: 0.01, label: "Height", },
		{ id: 'mzp7', name: 'volCtrl', value: 0.5, range: [0, 1], step: 0.01, label: "Volume", },
		{ id: 'mzp2', name: 'hairlineLevelCtrl', value: 0.5, range: [0, 2], step: 0.01, label: "Hairline Level", },
		{ id: 'mzp3', name: 'hairlineRidgeCtrl', value: 1, range: [0, 2], step: 0.01, label: "Hairline Ridge", },
		{ id: 'mzp6', name: 'spanCtrl', value: 1, range: [0, 2], step: 0.01, label: "Span", },
	]


	const archetypes: any = [

		{ option: "PUNK", label: "Punk", icon: "TEST", console: "PunkConsole", params: punkParams, default: false, checked: false },
		{ option: "BAROQUE", label: "Baroque", icon: "TEST", console: 'BaroqueConsole', params: baroqueParams, default: false, checked: false },
		{ option: "NERD", label: "Nerd", icon: "TEST", console: 'NerdConsole', params: nerdParams, default: false, checked: false },

	]

	const [isPaperLoaded, setIsPaperLoaded] = useState(false);

	const [archetype, setArchetype] = useState<Model | null>(null);
	const [paramsForArchetype, setParamsForArchetype] = useState<ParamSet | null>(null);

	const [scaleCtrl, setScaleCtrl] = useState(3);


	//-----------------------------------------------------------------------


	useEffect(() => { 

		if (isPaperLoaded) {

			const _archetypeParams: any = {};

			if (archetype === null) {

			} else {

				Array.from(archetype.params.values() || []).forEach((p: any) => {

					_archetypeParams[p.name] = p.value; 

				});	

			}


			model(_archetypeParams);
		}

	}, [scaleCtrl, paramsForArchetype]);


	//-----------------------------------------------------------------------

	function handleGenerateAction(selectedArchetype: any) {

		if (isPaperLoaded) {
			
			console.log(`ready to generate ${selectedArchetype.label}`);

			const _archetypeParams: any = {};

			Array.from(selectedArchetype.params.values() || []).forEach((p: any) => {

				_archetypeParams[p.name] = p.value; 

			});

			reset();
			generate(selectedArchetype.option, _archetypeParams);
			model(_archetypeParams);

			setArchetype(selectedArchetype);
			setParamsForArchetype(selectedArchetype.params);

		} else {

		}
	};


	function handleRegenerateAction(selectedArchetype: any) {

		if (isPaperLoaded) {
			
			console.log(`ready to regenerate ${selectedArchetype.label}`);

			const _archetypeParams: any = {};

			Array.from(selectedArchetype?.params.values() || []).forEach((p: any) => {

				_archetypeParams[p.name] = p.value; 

			});


			// reset();
			regenerate(_archetypeParams);
			model(_archetypeParams);


		} else {

		}

	};

	function handleParamCtrlInputForArchetype(updatedParams: ParamSet) {

		setParamsForArchetype(updatedParams);
	}	

	return (
        
		<div className={`relative w-3/4 h-[80vh] m-5 border border-slate-900`}>

		  	
			<div className={`w-full h-full`}>

				<Stage

					onPaperLoad={setIsPaperLoaded}
					options={archetypes}
					onGenerate={handleGenerateAction}
					onRegenerate={handleRegenerateAction}
				/>


			</div>


			<div className={`absolute top-0 left-0 max-w-[250px] h-fit h-[70vh] m-5 border border-slate-900`} > 

				<Console

					archetype={archetype}
					paramsForArchetype={paramsForArchetype}
					paramsForHead={null}
					paramsForEyes={null}
					paramsForNose={null}
					archetypeInputHandler={handleParamCtrlInputForArchetype}
					headInputHandler={null}
					eyesInputHandler={null}
					noseInputHandler={null}
				/>

			</div>

		</div>

	)
}

export default Lab;
