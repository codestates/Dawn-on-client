import { combineReducers } from "redux";
import isLoginReducer from "./isLogin";
import addTaskReducer from "./addTaskModule";

const rootReducer = combineReducers({
  isLoginReducer,
  addTaskReducer
});

export default rootReducer;
