import { DEFAULT_THEME } from "@mantine/core";
import ControlChipOptions from "../ControlChipOptions";
import ControlOptions from "../ControlOptions";
import ControlSlider from "../ControlSlider";
import ControlTextInput from "../ControlTextInput";
import ControlValue from "../ControlValue";

const dark = DEFAULT_THEME.colors.dark[5];

interface ConsoleProps {
	params: any[];
	inputHandler: Function;
	layout: string;
	mode: string;
}

interface Style {
	width: string;
	display: string;
	flexDirection: React.CSSProperties["flexDirection"];
	justifyContent?: React.CSSProperties["justifyContent"];
	gap?: string;
}

 const selectControl = (p: any, inputHandler: Function, mode: string) => {
    let Control: any;
    switch (p.type) {
    case "SLIDER" : Control = ControlSlider;
    	break;
    case "VALUE" : Control = ControlValue;
    	break;
    case "OPTIONS" : Control = ControlOptions;
    	break;
    case "TEXT" : Control = ControlTextInput;
    	break;
    case "CHIPS" : Control = ControlChipOptions;
    	break;
    default: 
    	Control = ControlSlider;
    }
    return (
      <Control key={p.id} id={p.id} mode={mode} param={p} color={dark} onValueChange={inputHandler} />
    );
  };

const MixedInputConsole = (props: ConsoleProps) => {
	const { params, inputHandler, layout, mode } = props;

	function handleControlInput(value: number, id: string) {
		const paramsToUpdate = JSON.parse(JSON.stringify(params));

		const updatedParams = paramsToUpdate.map((item: any) => {
			if (item.id === id) {
				item.value = value;
			}
			return item;
		});

		inputHandler(updatedParams);
	}

	const rowLayout: Style = {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: "0.50rem",
	};

	const colLayout: Style = {
		width: "100%",
		display: "flex",
		flexDirection: "column",
	};


	// const gap = mode === "COMPACT" ? "0.90rem" : "1.50rem";
	const gap = "0.75rem";
	const filterCriteria = layout === "ROW" ? (p: any) => p.rank === 1 : (p: any) => p; // spit the sliders in 2 columns according to their rank value

	return (
		<div style={layout === "ROW" ? rowLayout : colLayout}>
			<div style={{ width: "100%" }}>
				{params
					.filter(filterCriteria)
					.map((p: any) => (
						<div
							key={p.id}
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<div style={{ width: "100%", paddingBottom: gap }}>
							{ selectControl(p, handleControlInput, "COMPACT")}
							</div>
						</div>
					))}
			</div>
			{layout === "ROW" && <div style={{ width: "100%" }}>
				{params
					.filter((p: any) => p.rank === 2)
					.map((p: any) => (
						<div
							key={p.id}
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<div style={{ width: "100%", paddingBottom: gap }}>
								{ selectControl(p, handleControlInput, "COMPACT")}
							</div>
						</div>
					))}
			</div>}
			
		</div>
	);
};

export default MixedInputConsole;
