import { Dispatch, useReducer } from "react";
import { Model, ParamSet } from "../types";

import TestConsole from "../components/consoles/testConsole";

const baseParamSchema: ParamSet = [
	{
		id: "hp1",
		name: "",
		value: 1,
		range: [0, 2],
		step: 0.01,
		label: "Ears Size",
	},
	{
		id: "hp2",
		name: "",
		value: 1,
		range: [0, 2],
		step: 0.01,
		label: "Ears Height",
	},
	{ id: "hp3", name: "", value: 1, range: [0, 2], step: 0.01, label: "..." },
	{
		id: "eyep1",
		name: "eyeScaleCtrl",
		value: 1,
		range: [0, 2],
		step: 0.01,
		label: "Eye Size",
	},
	{
		id: "eyep2",
		name: "eyeDistanceCtrl",
		value: 1,
		range: [0, 2],
		step: 0.01,
		label: "Eye Distance",
	},
	{
		id: "eyep3",
		name: "eyeRoundnessCtrl",
		value: 1,
		range: [0, 2],
		step: 0.01,
		label: "Eye Roundness",
	},
	{
		id: "eyep4",
		name: "pTest",
		value: 1,
		range: [0, 2],
		step: 0.01,
		label: "p test 1",
	},
	{
		id: "eyep5",
		name: "pTest2",
		value: 0,
		range: [-1, 1],
		step: 0.01,
		label: "p test 2",
	},
	{
		id: "nsp1",
		name: "noseLengthCtrl",
		value: 1,
		range: [0, 2],
		step: 0.01,
		label: "Nose Length",
	},
	{
		id: "nsp2",
		name: "noseScaleCtrl",
		value: 1,
		range: [0, 2],
		step: 0.01,
		label: "Nose Size",
	},
	{
		id: "nsp3",
		name: "noseWidthCtrl",
		value: 0,
		range: [0, 2],
		step: 0.01,
		label: "Nose Width",
	},
];

const models: any = [
	{
		option: "ROUND",
		label: "Round Polka",
		icon: null,
		console: TestConsole,
		params: baseParamSchema,
		default: false,
		checked: false,
	},
	{
		option: "SQUARE",
		label: "Square Polka",
		icon: null,
		console: TestConsole,
		params: baseParamSchema,
		default: false,
		checked: false,
	},
	{
		option: "TRIANGULAR",
		label: "Triangular Polka",
		icon: null,
		console: TestConsole,
		params: baseParamSchema,
		default: false,
		checked: false,
	},
];

const modelReducer = (state: any, action: any) => {
	let selectedModel;

	switch (action.type) {
		case "ROUND":
			selectedModel =
				models.find((model: Model) => model.option === "ROUND") ||
				models[0];
			break;
		case "SQUARE":
			selectedModel =
				models.find((model: Model) => model.option === "SQUARE") ||
				models[0];
			break;
		case "TRIANGULAR":
			selectedModel =
				models.find((model: Model) => model.option === "TRIANGULAR") ||
				models[0];
			break;
		default:
			throw new Error(`ERROR: ${action.type} is not a valid model`);
	}

	return {
		...selectedModel,
		model: selectedModel,
	};
};

function useModel(): [Model[], Model, Dispatch<any>] {
	const defaultModel =
		models.find((model: Model) => model.default === true) || models[0];

	const model = {
		...defaultModel,
		model: defaultModel.model,
	};

	const [currentModel, setCurrentModel] = useReducer(modelReducer, model);

	return [models, currentModel, setCurrentModel];
}

export default useModel;

