import produce from "immer";

import * as types from "constants/types";

const initialState = {
  userData: {},
  token: JSON.parse(localStorage.getItem("token")),
  loading: false,
  checkAuthentication: localStorage.getItem("token") ? true : false,
  error: "",
};

const authsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.CHECK_AUTHENTICATION.SUCCEEDED: {
        draft.checkAuthentication = true;
        break;
      }

      case types.LOGIN.REQUEST:
      case types.REGISTER.REQUEST: {
        draft.loading = true;
        break;
      }

      case types.LOGIN.SUCCEEDED:
      case types.REGISTER.SUCCEEDED: {
        draft.userData = action.userData;
        draft.token = action.token;
        draft.loading = false;
        draft.error = "";
        draft.checkAuthentication = true;
        break;
      }

      case types.GET_USER_DATA.SUCCEEDED: {
        draft.userData = action.userData;
        break;
      }

      case types.LOGIN.FAILED:
      case types.REGISTER.FAILED:
      case types.GET_USER_DATA.FAILED:
      case types.CHECK_AUTHENTICATION.FAILED: {
        draft.userData = {};
        draft.token = "";
        draft.loading = false;
        draft.error = action.error;
        draft.checkAuthentication = false;
        break;
      }

      default:
        break;
    }
  });

export default authsReducer;
