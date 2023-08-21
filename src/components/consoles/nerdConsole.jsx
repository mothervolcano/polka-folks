
import NumberStepper from '../ui/numberStepper';
import Slider from '../ui/slider';
import Button from '../ui/button';

const NerdConsole = ({

	params,
	inputHandler

}) => {
	

	console.log(`Monk Console: ${ params }`);

	
	function handleInput( value, id ) {

		const updatedParams = params.slice();

		updatedParams.map( (item) => {

			if ( item.id === id ) {

				item.value = value;
			}
		});	

		inputHandler( updatedParams );
	};
	

	return (
	        	
    		<div className={`h-fit`}>
    			
    			<div className={`w-full h-[24rem] grid grid-rows-8 grid-cols-8 bg-white`}>

    				<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[0].id}
							label={params[0].label}
							min={0}
							max={2}
							step={0.01}
							defaultValue={ params[0].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[1].id}
							label={params[1].label}
							min={0}
							max={2}
							step={0.01}
							defaultValue={ params[1].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[2].id}
							label={params[2].label}
							min={0}
							max={2}
							step={0.01}
							defaultValue={ params[2].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

					<div className={`col-span-4 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[3].id}
							min={0}
							max={2}
							step={0.01}
							defaultValue={ params[3].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

					<div className={`col-span-4 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[4].id}
							min={0}
							max={2}
							step={0.01}
							defaultValue={ params[4].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

    			</div>
    		</div>
	        	

	        )
}


export default NerdConsole;

