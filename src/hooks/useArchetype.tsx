import { Dispatch, useReducer } from "react";
import { Model, ParamSet } from "../types";


const reducerFor = (models: Model[]) => {
  const modelReducer = (state: any, action: any) => {
    let selectedModel;

    switch (action.type) {
      case "PUNK":
        selectedModel =
          models.find((model: Model) => model.option === "PUNK") || models[0];
        break;
      case "BAROQUE":
        selectedModel =
          models.find((model: Model) => model.option === "BAROQUE") ||
          models[0];
        break;
      case "NERD":
        selectedModel =
          models.find((model: Model) => model.option === "NERD") || models[0];
        break;
      default:
        throw new Error(`ERROR: ${action.type} is not a valid archetype`);
    }

    return {
      ...selectedModel,
      model: selectedModel.model,
    };
  };
  return modelReducer;
};


function useArchetype(models: Model[]): [Model, Dispatch<any>] {
  const defaultModel =
    models.find((model: Model) => model.default === true) || models[0];

  const model = {
    ...defaultModel,
    model: defaultModel.model,
  };

  const [currentModel, setCurrentModel] = useReducer(reducerFor(models), model);

  return [currentModel, setCurrentModel];
}

export default useArchetype;
