import { MouseEventHandler } from "react";


interface ButtonProps {

	labelText: string;
	onClickEventHandler: Function;
	disabled?: Boolean; 
	action?: string;
}



const Button = ( props: ButtonProps ) => {

	const { labelText, action, onClickEventHandler, disabled=false } = props;

	function handleClick( event: React.MouseEvent<HTMLButtonElement>  ) {

		if ( event.target ) {

			const value = event.currentTarget.value;
			onClickEventHandler( value );
		}
	};


	return (

    	<button

    		className=	"inline-block relative overflow-hidden text-center rounded-md px-4 py-2 bg-slate-900 hover:bg-slate-700"

			type="button"
			value={ action }
			disabled={ Boolean(disabled) }
			onClick={ handleClick }
		>
			<span className="text-base text-white">{labelText}</span>
	 	
		</button>

	);
};


export default Button;