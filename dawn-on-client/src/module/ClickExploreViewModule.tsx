import initialState from "./initialState";

const GET_CLICK_EXPLORE_VIEW = "GET_CLICK_EXPLORE_VIEW";

const EXPLORE_THUMBS_UP = "EXPLORE_THUMBS_UP";

export const getClickExploreView = (post: object) => ({
  type: GET_CLICK_EXPLORE_VIEW,
  payload: post,
});

export const ExploreThumbsUp = (isThumbsUp: boolean) => ({
  type: EXPLORE_THUMBS_UP,
  payload: isThumbsUp,
});

export default function getClickExploreViewReducer(
  state: any = initialState,
  action: any
) {
  switch (action.type) {
    case GET_CLICK_EXPLORE_VIEW:
      return {
        ...state,
        click_exploreview: { ...action.payload },
      };
    case EXPLORE_THUMBS_UP:
      return {
        ...state,
        ExploreThumbsUp: action.payload,
      };
    default:
      return state;
  }
}
