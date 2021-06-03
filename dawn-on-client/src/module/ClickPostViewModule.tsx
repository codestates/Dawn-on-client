import initialState from "./initialState";

const GET_CLICK_POST_VIEW = "GET_CLICK_POST_VIEW";

const MYPOST_THUMBS_UP = "MYPOST_THUMBS_UP";

export const getClickPostView = (post: object) => ({
  type: GET_CLICK_POST_VIEW,
  payload: post,
});

export const MyPostThumbsUp = (isThumbsUp: boolean) => ({
  type: MYPOST_THUMBS_UP,
  payload: isThumbsUp,
});

// myfeed에서 클릭한 게시물에 대한 데이터를 저장하는 Reducer
export default function getClickPostViewReducer(
  state: any = initialState,
  action: any
) {
  switch (action.type) {
    case GET_CLICK_POST_VIEW:
      return {
        ...state,
        click_postview: { ...action.payload },
      };
    case MYPOST_THUMBS_UP:
      return {
        ...state,
        MyPostThumbsUp: action.payload,
      };
    default:
      return state;
  }
}
