import { initialState } from "./initialState";

const GET_EDITPROFILE_STATE = "GET_EDITPROFILE_STATE";

export const getEditProfileState = (isEditProfile: boolean) => ({
  type: GET_EDITPROFILE_STATE,
  payload: isEditProfile,
});

export default function isEditProfileReducer(
  state: any = initialState,
  action: any
) {
  switch (action.type) {
    case GET_EDITPROFILE_STATE:
      return {
        ...state,
        isEditProfile: action.payload,
      };
    default:
      return state;
  }
}
