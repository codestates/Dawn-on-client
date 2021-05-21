import { combineReducers } from "redux";
import isLoginReducer from "./isLogin";

const rootReducer = combineReducers({
  isLoginReducer,
});

export default rootReducer;
