import initialState from "./initialState";

const GET_RANKING_FIRST = "GET_RANKING_FIRST";
const GET_RANKING_SECOND = "GET_RANKING_SECOND";
const GET_RANKING_THIRD = "GET_RANKING_THIRD";

export const getRankingFirst = (FirstRank: Object) => ({
  type: GET_RANKING_FIRST,
  payload: FirstRank,
});

export const getRankingSecond = (SecondRank: Object) => ({
  type: GET_RANKING_SECOND,
  payload: SecondRank,
});

export const getRankingThird = (ThirdRank: Object) => ({
  type: GET_RANKING_THIRD,
  payload: ThirdRank,
});

export default function getRankingListReducer(
  state: any = initialState,
  action: any
) {
  switch (action.type) {
    case GET_RANKING_FIRST:
      return {
        ...state,
        ranking_first: {
          user_img: action.payload.user_img,
          user_nickname: action.payload.user_nickname,
          total_thumbsup: action.payload.total_thumbsup,
        },
      };
    case GET_RANKING_SECOND:
      return {
        ...state,
        ranking_second: {
          user_img: action.payload.user_img,
          user_nickname: action.payload.user_nickname,
          total_thumbsup: action.payload.total_thumbsup,
        },
      };
    case GET_RANKING_THIRD:
      return {
        ...state,
        ranking_third: {
          user_img: action.payload.user_img,
          user_nickname: action.payload.user_nickname,
          total_thumbsup: action.payload.total_thumbsup,
        },
      };
    default:
      return state;
  }
}
