import { Dispatch, useReducer } from "react";
import { Archetype, Model, ParamSet } from "../types";


const reducerFor = (models: Archetype[]) => {
  const modelReducer = (state: any, action: any) => {
    let selectedModel;

    switch (action.type) {
      case "PUNK":
        selectedModel =
          models.find((model: Archetype) => model.option === "PUNK") || models[0];
        break;
      case "BAROQUE":
        selectedModel =
          models.find((model: Archetype) => model.option === "BAROQUE") ||
          models[0];
        break;
      case "NERD":
        selectedModel =
          models.find((model: Archetype) => model.option === "NERD") || models[0];
        break;
      default:
        throw new Error(`ERROR: ${action.type} is not a valid archetype`);
    }

    return {
      ...selectedModel
    };
  };
  return modelReducer;
};


function useArchetype(models: Archetype[]): [Archetype, Dispatch<any>] {
  const defaultModel =
    models.find((model: Archetype) => model.default === true) || models[0];

  const model = {
    ...defaultModel
  };

  const [currentModel, setCurrentModel] = useReducer(reducerFor(models), model);

  return [currentModel, setCurrentModel];
}

export default useArchetype;
