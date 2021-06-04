import initialState from "./initialState";

const RESET_AFTER_UPLOAD = "RESET_AFTER_UPLOAD";

export const resetAfterUpload = () => ({
  type: RESET_AFTER_UPLOAD,
});

export default function resetDataReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case RESET_AFTER_UPLOAD:
      return {
        ...state,
      };
    default:
      return state;
  }
}