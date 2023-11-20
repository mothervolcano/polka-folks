import { Dispatch, useReducer } from "react";
import { Model, ParamSet } from "../types";

const reducerFor = (models: Model[]) => {
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
					models.find(
						(model: Model) => model.option === "TRIANGULAR",
					) || models[0];
				break;
			default:
				throw new Error(`ERROR: ${action.type} is not a valid model`);
		}

		return {
			...selectedModel,
			model: selectedModel,
		};
	};

	return modelReducer;
};

function useModel(models: Model[]): [Model, Dispatch<any>] {
	const defaultModel =
		models.find((model: Model) => model.default === true) || models[0];

	const model = {
		...defaultModel,
		model: defaultModel.model,
	};

	const [currentModel, setCurrentModel] = useReducer(
		reducerFor(models),
		model,
	);

	return [currentModel, setCurrentModel];
}

export default useModel;
