import {
	AspectRatio,
	Container,
	DEFAULT_THEME,
	Grid,
	Group,
	Space,
	Stack,
	Title,
	Text,
	SegmentedControl,
    SegmentedControlItem,
} from "@mantine/core";
import archetypeSelectorStyles from "./styles/archetypeSelector.module.css"

import { useState, useEffect } from "react";

import { ParamSet, Param, Model, Archetype } from "./types";

import { archetypes } from "./models/archetypes";
import { folks } from "./models/folks";

import useModel from "./hooks/useModel";
import useArchetype from "./hooks/useArchetype";
import PaperStage from "./components/paperStage";

import { reset, generate, regenerate, model, save } from "./stage";



// --------------------------------------------------------------
// HELPERS

function parseParams(updatedParams: ParamSet) {
	const modelParams: any = {};

	Array.from(updatedParams.values()).forEach((p: any) => {
		modelParams[p.name] = p.value;
	});

	return modelParams;
}

// --------------------------------------------------------------

const UI = () => {
	const [isPaperLoaded, setIsPaperLoaded] = useState<boolean>(false);
	const [initialized, setInitialized] = useState<boolean>(false);
	const [currentModel, setCurrentModel] = useModel(folks);
	const [currentArchetype, setCurrentArchetype] = useArchetype(archetypes);

	const [baseParams, setBaseParams] = useState<ParamSet | null>(null);
	const [paramsForArchetype, setParamsForArchetype] =
		useState<ParamSet | null>(null);

	const [scaleCtrl, setScaleCtrl] = useState(3);

	// ----------------------------------------------------------------------------

	const archetypeOptions: SegmentedControlItem[] = archetypes.map((archetype) => {
		return {
			label: archetype.option,
			value: archetype.option,
		};
	});

	//----------------------------------------------------------------------------
	// HOOKS


	useEffect(() => {
		if (!isPaperLoaded) {
			console.log("PAPER ISN'T LOADED");
			return () => {};
		}

		// console.log("1 --> PAPERJS LOADED! CurrentModel: ", currentArchetype);

		const updatedBaseParams = parseParams(currentModel.params);
		const updatedArchetypeParams = parseParams(currentArchetype.params);
		setBaseParams(currentModel.params);
		setParamsForArchetype(currentArchetype.params);

		reset();
		generate(
			currentArchetype,
			updatedBaseParams,
			updatedArchetypeParams,
		);
		model(updatedBaseParams, updatedArchetypeParams);

		if (!initialized) {
			setInitialized(true);
		}
	}, [isPaperLoaded]);

	//-----------------------------------------------------------------------

	useEffect(() => {
		if (!isPaperLoaded) {
			console.log("PAPER ISN'T LOADED");
			return () => {};
		}

		// console.log(
		// 	"1 --> SWITCH ARCHETYPE! currentArchetype: ",
		// 	currentArchetype,
		// );

		const updatedBaseParams = parseParams(currentModel.params);
		const updatedArchetypeParams = parseParams(currentArchetype.params);
		setBaseParams(currentModel.params);
		setParamsForArchetype(currentArchetype.params);

		reset();
		generate(
			currentArchetype,
			updatedBaseParams,
			updatedArchetypeParams,
		);
		model(updatedBaseParams, updatedArchetypeParams);
	}, [currentArchetype]);

	//-----------------------------------------------------------------------

	useEffect(() => {
		if (!isPaperLoaded) {
			console.log("PAPER ISN'T LOADED");
			return () => {};
		}

		// console.log(
		// 	"1 --> MODEL ARCHETYPE! currentArchetype: ",
		// 	currentArchetype,
		// );

		const updatedBaseParams = parseParams(currentModel.params);
		const updatedArchetypeParams = parseParams(currentArchetype.params);

		model(updatedBaseParams, updatedArchetypeParams);
	}, [paramsForArchetype]);

	//-----------------------------------------------------------------------

	function handleRegenerateAction() {
		if (!isPaperLoaded) {
			console.log("PAPER ISN'T LOADED");
			return () => {};
		}

		console.log(`ready to regenerate ${currentArchetype.label}`);

		const updatedBaseParams = parseParams(currentModel.params);
		const updatedArchetypeParams = parseParams(currentArchetype.params);

		// reset();
		regenerate(updatedBaseParams, updatedArchetypeParams);
		model(updatedBaseParams, updatedArchetypeParams);
	}

	function handleParamCtrlInputForArchetype(updatedParams: ParamSet) {
		setParamsForArchetype(updatedParams);
	}

	// ------------------------------------------------------------------------
	// UI HANDLERS

	const handleArchetypeSelection = (value: string) => {
		setCurrentArchetype({ type: value });
	};

	function handleSaveAction() {
		save();
	}

	// ------------------------------------------------------------------------
	// BLOCKS

	function switchConsole(archetype: Archetype) {
		// ...
		const ArchetypeConsole = archetype.console;

		return (
			<ArchetypeConsole
				params={paramsForArchetype}
				inputHandler={handleParamCtrlInputForArchetype}
			/>
		);
	}

	// ------------------------------------------------------------------------

	const frameMargin = 6;
	const dark = DEFAULT_THEME.colors.dark[5];
	const softDark = DEFAULT_THEME.colors.dark[0];
	const light = DEFAULT_THEME.colors.gray[0];
	const softLight = DEFAULT_THEME.colors.gray[2];

	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100vh",
				padding: `${frameMargin}vh`,
			}}
		>
			<div style={{ border: `1px solid ${dark}`, borderRadius: `10px` }}>
				<Grid align="stretch" gutter={0}>
					<Grid.Col span={2}>
						<Container
							fluid
							w="100%"
							bg={dark}
							pt="sm"
							pb="md"
							mb="md"
							style={{ borderRadius: "8px 0 0 0" }}
						>
							<Title c={light}>Polka Folks</Title>
							<Space h="md" />
							<Text size="sm" c={softLight}>
								Project description goes here. It should be a
								brief succint text introducing the concept
							</Text>
						</Container>
						<Stack w={"100%"} p={15}>
							{initialized &&
								currentArchetype &&
								switchConsole(currentArchetype)}
						</Stack>
					</Grid.Col>
					<Grid.Col span={10}>
						<div
							style={{
								position: "relative",
								height: `${100 - frameMargin * 2}vh`,
								borderLeft: `1px solid ${dark}`,
							}}
						>
							<div
								style={{
									position: "absolute",
									top: "15px",
									left: "15px",
								}}
							>
								<Stack gap={9}>
									<SegmentedControl
										value={currentModel.option}
										onChange={handleArchetypeSelection}
										data={archetypeOptions}
										color={dark}
										size="xs"
										m={0}
										p={0}
										classNames={archetypeSelectorStyles}
									/>
									<Text
										size="sm"
										fw={500}
										c={softDark}
										ml="1vw"
									>
										Choose a model...
									</Text>
								</Stack>
							</div>
							<div
								style={{
									position: "absolute",
									bottom: "0px",
									left: "0px",
									width: "100%",
								}}
							>
								<Group grow gap={0}>
									<div
										style={{
											borderRight: "1px solid black",
											borderTop: "1px solid black",
										}}
									>
										<AspectRatio ratio={1 / 1}>
											<Container>slot 1</Container>
										</AspectRatio>
									</div>
									<div
										style={{
											borderRight: "1px solid black",
											borderTop: "1px solid black",
										}}
									>
										<AspectRatio ratio={1 / 1}>
											<Container>slot 2</Container>
										</AspectRatio>
									</div>
									<div
										style={{
											borderRight: "1px solid black",
											borderTop: "1px solid black",
										}}
									>
										<AspectRatio ratio={1 / 1}>
											<Container>slot 3</Container>
										</AspectRatio>
									</div>
									<div
										style={{
											borderRight: "1px solid black",
											borderTop: "1px solid black",
										}}
									>
										<AspectRatio ratio={1 / 1}>
											<Container>slot 4</Container>
										</AspectRatio>
									</div>
									<div
										style={{
											borderRight: "1px solid black",
											borderTop: "1px solid black",
										}}
									>
										<AspectRatio ratio={1 / 1}>
											<Container>slot 5</Container>
										</AspectRatio>
									</div>
									<div
										style={{
											borderRight: "1px solid black",
											borderTop: "1px solid black",
										}}
									>
										<AspectRatio ratio={1 / 1}>
											<Container>slot 6</Container>
										</AspectRatio>
									</div>
								</Group>
							</div>
							<PaperStage onPaperLoad={setIsPaperLoaded} />
						</div>
					</Grid.Col>
				</Grid>
			</div>
		</div>
	);
};

export default UI;
