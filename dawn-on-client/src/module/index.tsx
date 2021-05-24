import { combineReducers } from "redux";
import isLoginReducer from "./isLogin";
import addColumnReducer from "./dragging";

const rootReducer = combineReducers({
  isLoginReducer,
  addColumnReducer
});

export default rootReducer;
