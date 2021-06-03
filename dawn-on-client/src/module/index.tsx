import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import isEditProfileReducer from "./EditProfileModule";
import editTodoReducer from "./editTodoModule";
import isLoginReducer from "./isLogin";
import addTaskReducer from "./addTaskModule";
const persistConfig = {
  key: "root", // reducer 객체에서 데이터를 저장하는 지점 설정
  storage, // 로컬 스토리지 사용
};

const rootReducer = combineReducers({
  isLoginReducer,
  addTaskReducer,
  isEditProfileReducer,
  editTodoReducer
});
export default persistReducer(persistConfig, rootReducer);
