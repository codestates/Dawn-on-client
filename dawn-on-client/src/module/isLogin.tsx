import initialState from "./initialState";

const GET_LOGIN_STATE = "GET_LOGIN_STATE";

export const getLoginState = (islogin: boolean) => ({
  type: GET_LOGIN_STATE,
  payload: islogin,
});

export default function isLoginReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case GET_LOGIN_STATE:
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      return state;
  }
}
