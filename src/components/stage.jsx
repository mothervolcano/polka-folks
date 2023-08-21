import { useState } from 'react';

import PaperStage from './paperStage';
import SettingsModal from './modals/settingsModal';
import TileGridMenu from './ui/tileGridMenu';
import Button from './ui/button';


const Stage = ({ 

	onPaperLoad,
	options,
	onGenerate,
	onRegenerate

}) => {

	const [ showSettings, setShowSettings ] = useState(true);
	const [ init, setInit ] = useState(true);
	const [ selectedOption, setSelectedOption ] = useState(null);
	
	
	function handleOpenAction( e ) {

		setInit(false);
		setShowSettings(true);
	}


	function handleCloseAction( e ) {

		setShowSettings(false);
	}


	function handleSelectionInput( updatedOptions ) {

		const _selectedOption = updatedOptions.find( (item) => item.checked === true );

		setSelectedOption( _selectedOption );
	}
	

	function handleSubmitAction( e ) {

		if ( selectedOption ) {

			setShowSettings(false);
			onGenerate( selectedOption );

		} else {

			// TODO: alert message: a choice has to be made.
		}
	}

	function handleRegenerateAction( e ) {

		onRegenerate( selectedOption );
	}


	return <> 

		<PaperStage onPaperLoad={onPaperLoad} />

		<SettingsModal

			init={init}
			show={showSettings}
			buttonLabel={`Generate`}
			onSubmit={handleSubmitAction}
			onClose={handleCloseAction}
		>

			<TileGridMenu

				options={options}
				onSelect={handleSelectionInput}

			/>

		</SettingsModal>

		<div className="absolute bottom-0 right-0 m-2">
					
			{ !showSettings && (

				<>

					<Button	
						labelText="new"
						onClickEventHandler={ handleOpenAction }
					/>

					<Button	
						labelText="regenerate"
						onClickEventHandler={ handleRegenerateAction }
					/>

				</>

			)}

		</div>

	</>
}


export default Stage;


