import * as types from "constants/types";

class AuthsAction {
  checkAuthenticationRequest = () => ({
    type: types.CHECK_AUTHENTICATION.REQUEST,
  });
  checkAuthenticationSucceeded = () => ({
    type: types.CHECK_AUTHENTICATION.SUCCEEDED,
  });
  checkAuthenticationFailed = () => ({
    type: types.CHECK_AUTHENTICATION.FAILED,
  });

  getUserDataRequest = () => ({
    type: types.GET_USER_DATA.REQUEST,
  });
  getUserDataSucceeded = ({ userData }) => ({
    type: types.GET_USER_DATA.SUCCEEDED,
    userData,
  });
  getUserDataFailed = (error) => ({
    type: types.GET_USER_DATA.FAILED,
    error,
  });

  loginRequest = (loginData, cb, cbError) => ({
    type: types.LOGIN.REQUEST,
    ...loginData,
    cb,
    cbError,
  });
  loginSucceeded = ({ token, userData }) => ({
    type: types.LOGIN.SUCCEEDED,
    token,
    userData,
  });
  loginFailed = (error) => ({
    type: types.LOGIN.FAILED,
    error,
  });

  registerRequest = (registerData, cb, cbError) => ({
    type: types.REGISTER.REQUEST,
    ...registerData,
    cb,
    cbError,
  });
  registerSucceeded = ({ token, userData }) => ({
    type: types.REGISTER.SUCCEEDED,
    token,
    userData,
  });
  registerFailed = (error) => ({
    type: types.REGISTER.FAILED,
    error,
  });

  logout = () => ({
    type: types.LOGOUT.ROOT,
  });
}

export default new AuthsAction();
