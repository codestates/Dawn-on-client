import initialState from "./initialState";

const ADD_NEW_SUBJECT = "ADD_NEW_SUBJECT";
const ADD_A_TODO = "ADD_TO_TODO";
const ADD_UPPER_DATA = "ADD_UPPER_DATA";
const DELETE_A_TASK = "DELETE_A_TASK";
const CHANGE_BACK_COLOR = "CHANGE_BACK_COLOR";
const CHANGE_CHECKED = "CHANGE_CHECKED";


export const addNewSubject = (subject: String, color: String) => ({
  type: ADD_NEW_SUBJECT,
  payload: {
    subject: subject,
    color: color,
  }
});

// date, memo 데이터 추가 액션
export const addUpperData = (memo: String) => ({
  type: ADD_UPPER_DATA,
  payload: memo
});

// todo 데이터 추가 액션
export const addToTimetable = (id: Number, subject: String, todo_comment: String, start_time:String, learning_time: Number, box_color: any) => ({
  type: ADD_A_TODO,
  payload: {
    id: id,
    subject: subject,
    todo_comment: todo_comment,
    learning_time: learning_time,
    start_time: start_time,
    box_color: box_color
  }
});

// todos 삭제 액션
export const deleteTodo = (id: number) => ({
  type: DELETE_A_TASK,
  payload: id
});

export const changeBackColor = (back_color: String) => ({
  type: CHANGE_BACK_COLOR,
  payload: back_color
});

export const changeChecked = (id: number, checked: boolean) => ({
  type: CHANGE_CHECKED,
  payload: {
    id: id,
    checked: checked,
  }
});

export default function addTaskReducer (state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_A_TODO:
      return {
        ...state,
        plannerDatas: {
          ...state.plannerDatas,
          todos: [
            ...state.plannerDatas.todos,
            action.payload
          ]
        }
      };
    case DELETE_A_TASK: 
      const without = state.plannerDatas.todos.filter((el:any) => el.id !== action.payload);
      return {
        ...state,
        plannerDatas: {
          ...state.plannerDatas,
          todos: [
            ...without,
          ]
        }
      };
    case ADD_UPPER_DATA: 
    return {
      ...state,
      plannerDatas: {
        ...state.plannerDatas,
        memo: action.payload.memo,
      }
    }
    case CHANGE_BACK_COLOR:
      return {
        ...state,
        plannerDatas: {
          ...state.plannerDatas,
          back_color: action.payload
        }
      }
    case CHANGE_CHECKED:
      return{
        ...state,
        plannerDatas: {
          ...state.plannerDatas,
          todos: [
            ...state.plannerDatas.todos,
            action.payload
          ]
        }
      }
    default:
      return state;
  }
}
