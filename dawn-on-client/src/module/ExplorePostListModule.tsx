import initialState from "./initialState";

const GET_EXPLORE_LIST = "GET_EXPLORE_LIST";

export const getExploreList = (postlist: Array<any>) => ({
  type: GET_EXPLORE_LIST,
  payload: postlist,
});

export default function getExploreListReducer(
  state: any = initialState,
  action: any
) {
  switch (action.type) {
    case GET_EXPLORE_LIST:
      return {
        ...state,
        ExploreList: action.payload,
      };
    default:
      return state;
  }
}
