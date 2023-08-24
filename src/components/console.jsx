import NerdConsole from './consoles/nerdConsole';
import MonkConsole from './consoles/monkConsole';
import BaroqueConsole from './consoles/baroqueConsole';
import PunkConsole from './consoles/punkConsole';

import TestConsole from './console/TestConsole';


import NumberStepper from './ui/numberStepper';
import Slider from './ui/slider';
import Button from './ui/button';


const Console = ({

	archetype,
	paramsForArchetype,
	paramsForHead,
	paramsForEyes,
	paramsForNose,
	archetypeInputHandler,
	headInputHandler,
	eyesInputHandler,
	noseInputHandler,

}) => {

	function selectConsole( ARCHETYPE ) {

		switch( ARCHETYPE ) {

			case 'BAROQUE': 
				return ( <BaroqueConsole  params={paramsForArchetype} inputHandler={archetypeInputHandler} /> );
				break;
			case 'MONK': 
				return ( <MonkConsole  params={paramsForArchetype} inputHandler={archetypeInputHandler} /> );
				break;
			case 'NERD':
				return ( <NerdConsole params={paramsForArchetype} inputHandler={archetypeInputHandler} /> );
				break;
			case 'PUNK':
				return ( <PunkConsole params={paramsForArchetype} inputHandler={archetypeInputHandler} /> );
				break;
			case 'TEST':
				return ( <TestConsole params={paramsForArchetype} inputHandler={archetypeInputHandler} /> );
				break;
		}
	}

	function handleInputForEyes( value, id ) {

		const updatedParams = paramsForEyes.slice();

		updatedParams.map( (item) => {

			if ( item.id === id ) {

				item.value = value;
			}
		});	

		eyesInputHandler( updatedParams );
	};

	function handleInputForNose( value, id ) {

		const updatedParams = paramsForNose.slice();

		updatedParams.map( (item) => {

			if ( item.id === id ) {

				item.value = value;
			}
		});	

		noseInputHandler( updatedParams );
	};

	return (

	    <>	

	    	<div className={`h-fit`}>
		    	
		    	<div className={`w-full h-[12rem] grid grid-rows-8 grid-cols-8 bg-white`}>

		    		<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={paramsForNose[0].id}
							label={paramsForNose[0].label}
							min={paramsForNose[0].range[0]}
							max={paramsForNose[0].range[1]}
							step={paramsForNose[0].step}
							defaultValue={ paramsForNose[0].value }
							onValueChangeHandler={ handleInputForNose }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={paramsForNose[1].id}
							label={paramsForNose[1].label}
							min={paramsForNose[1].range[0]}
							max={paramsForNose[1].range[1]}
							step={paramsForNose[1].step}
							defaultValue={ paramsForNose[1].value }
							onValueChangeHandler={ handleInputForNose }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={paramsForNose[2].id}
							label={paramsForNose[2].label}
							min={paramsForNose[2].range[0]}
							max={paramsForNose[2].range[1]}
							step={paramsForNose[2].step}
							defaultValue={ paramsForNose[2].value }
							onValueChangeHandler={ handleInputForNose }
						/>					

					</div>

		    	</div>

	    	</div>
	    	

		    <div className={`h-fit`}>

		    	<div className={`w-full h-[12rem] grid grid-rows-8 grid-cols-8 bg-white`}>

		    		<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={paramsForEyes[0].id}
							label={paramsForEyes[0].label}
							min={paramsForEyes[0].range[0]}
							max={paramsForEyes[0].range[1]}
							step={paramsForEyes[0].step}
							defaultValue={ paramsForEyes[0].value }
							onValueChangeHandler={ handleInputForEyes }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={paramsForEyes[1].id}
							label={paramsForEyes[1].label}
							min={paramsForEyes[1].range[0]}
							max={paramsForEyes[1].range[1]}
							step={paramsForEyes[1].step}
							defaultValue={ paramsForEyes[1].value }
							onValueChangeHandler={ handleInputForEyes }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={paramsForEyes[2].id}
							label={paramsForEyes[2].label}
							min={paramsForEyes[2].range[0]}
							max={paramsForEyes[2].range[1]}
							step={paramsForEyes[2].step}
							defaultValue={ paramsForEyes[2].value }
							onValueChangeHandler={ handleInputForEyes }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={paramsForEyes[3].id}
							label={paramsForEyes[3].label}
							min={paramsForEyes[3].range[0]}
							max={paramsForEyes[3].range[1]}
							step={paramsForEyes[3].step}
							defaultValue={ paramsForEyes[3].value }
							onValueChangeHandler={ handleInputForEyes }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={paramsForEyes[4].id}
							label={paramsForEyes[4].label}
							min={paramsForEyes[4].range[0]}
							max={paramsForEyes[4].range[1]}
							step={paramsForEyes[4].step}
							defaultValue={ paramsForEyes[4].value }
							onValueChangeHandler={ handleInputForEyes }
						/>					

					</div>

		    	</div>

			</div>
			
			{ selectConsole( archetype?.option ) }

	    </>

	)
};

export default Console;

