import initialState from "./initialState";

const GET_MYFEED_LIST = "GET_MYFEED_LIST";
const GET_MYFEED_INFO = "GET_MYFEED_INFO";

export const getMyFeedList = (postlist: Array<any>) => ({
  type: GET_MYFEED_LIST,
  payload: postlist,
});

export const getMyFeedInfo = (info: Object) => ({
  type: GET_MYFEED_INFO,
  payload: info,
});

export default function getMyFeedListReducer(
  state: any = initialState,
  action: any
) {
  switch (action.type) {
    case GET_MYFEED_LIST: //배열
      return {
        ...state,
        MyFeedList: action.payload,
      };
    case GET_MYFEED_INFO: //객체
      return {
        ...state,
        MyFeedinfo: {
          user_nickname: action.payload.user_nickname,
          user_img: action.payload.user_img,
          user_job: action.payload.user_job,
          profile_comment: action.payload.profile_comment,
          total_learning_time: action.payload.total_learning_time,
          total_posting: action.payload.total_posting,
        },
      };
    default:
      return state;
  }
}
