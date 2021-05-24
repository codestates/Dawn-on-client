import initialState from "./initialState";

const ADD_TO_COLUMN = "ADD_TO_COLUMN";

export const addToColumn = (column: String, index: Number, todo: String) => ({
  type: ADD_TO_COLUMN,
  payload: {
    column: column,
    index: index,
    todo: todo,
  },
});

export default function addColumnReducer (state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_TO_COLUMN:
      return {
        ...state,
        column2:[
          
        ]
      };
    default:
      return state;
  }
}
