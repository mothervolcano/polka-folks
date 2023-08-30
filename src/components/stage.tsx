import { useState } from 'react';

import PaperStage from './paperStage';
// import SettingsModal from './modals/settingsModal';
// import TileGridMenu from './ui/tileGridMenu';
import Button from './ui/button';


interface StageProps {

	onPaperLoad: Function;
}

const Stage = ( props: StageProps ) => {

	const { onPaperLoad } = props


	function handlePaperSetup( isPaperLoaded: boolean ) { // TODO: more can be done here. eg.: setup the canvas and make it draggable.

		isPaperLoaded && onPaperLoad( true );
	}	


	return <> 

		<PaperStage onPaperLoad={ handlePaperSetup } />

	</>
}


export default Stage;


