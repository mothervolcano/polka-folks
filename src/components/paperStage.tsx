import { useRef, useEffect, useState } from 'react';

import { PaperScope } from 'paper';


export const paperScope = new PaperScope();


const PaperStage = ({ 

	onPaperLoad 

}:any ) => {

	const canvasRef = useRef<HTMLCanvasElement>(null);


	useEffect( () => {

		paperScope.install(window);
		paperScope.setup(canvasRef.current);
		onPaperLoad(true);

	}, [] );

	return (

		<canvas 

			className="relative w-full h-full"
			ref={canvasRef} 
		>
			
		</canvas>
		
	)
}


export default PaperStage;