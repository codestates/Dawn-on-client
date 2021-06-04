import initialState from "./initialState";

const GET_SEARCH_VALUE = "GET_SEARCH_VALUE";

export const getSearchValue = (Search: string) => ({
  type: GET_SEARCH_VALUE,
  payload: Search,
});

export default function getSearchValueReducer(
  state: any = initialState,
  action: any
) {
  switch (action.type) {
    case GET_SEARCH_VALUE:
      return {
        ...state,
        SearchValue: action.payload,
      };
    default:
      return state;
  }
}
