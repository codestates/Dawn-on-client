import initialState from "./initialState";

const ADD_TO_TASK = "ADD_TO_TASK";

export const addToColumn = (id: Number, subject: String, task: String, hour: String) => ({
  type: ADD_TO_TASK,
  payload: {
    id: 'task-' + id.toString(),
    subject: subject,
    task: task,
    hour: hour
},
});

export default function addTaskReducer (state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_TO_TASK:
      console.log(state.plannerData.todos);
      return {
        ...state,
        plannerData: {
          ...state.plannerData,
          todos: [
            ...state.plannerData.todos,
            action.payload
          ]
        }
      };
    default:
      return state;
  }
}
