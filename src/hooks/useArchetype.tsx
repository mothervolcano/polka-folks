import { Dispatch, useReducer } from "react";
import { Archetype, Model, ParamSet } from "../types";


const reducerFor = (models: Archetype[]) => {

  const modelReducer = (state: any, action: any) => {

    switch (action.type) {
      case "PUNK":
        return { ...models.find((model: Archetype) => model.option === "PUNK")} || state;
      case "BAROQUE":
        return {...models.find((model: Archetype) => model.option === "BAROQUE")} ||
          state;
      case "NERD":
        return {...models.find((model: Archetype) => model.option === "NERD")} || state;
      default:
        return state;
    }
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
