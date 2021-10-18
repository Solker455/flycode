import {createStore, combineReducers} from "redux"
import { tokenReducer } from "./tokenReducer";
import { infoReducer } from "./infoReducer";

const rootReducer = combineReducers({
    tokenReducer,
    infoReducer
  })

export const store = createStore(rootReducer);