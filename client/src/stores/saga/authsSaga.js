import { takeLatest, put, call } from "redux-saga/effects";
import decoded from "jwt-decode";

import UseLocalStorage from "hooks/useLocalStorage";

import AuthsService from "services/AuthsService";
import * as types from "constants/types";
import AuthsAction from "stores/redux/actions/AuthsAction";

function* getUserData() {
  try {
    yield;
    const { data } = yield call(AuthsService.getUserData);

    yield put(AuthsAction.getUserDataSucceeded({ userData: data }));
  } catch (error) {
    console.log(error);
    yield put(AuthsAction.getUserDataFailed(error?.response?.data?.message));
    return error?.response?.status;
  }
}

function* login({ username, password, cb, cbError }) {
  const { saveToLocal } = UseLocalStorage();

  try {
    const formData = { username, password };
    const { data } = yield call(AuthsService.login, { data: formData });

    yield saveToLocal("token", data.token);
    yield put(
      AuthsAction.loginSucceeded({
        token: data.token,
        userData: data,
      })
    );
    yield cb?.();
  } catch (error) {
    yield put(AuthsAction.loginFailed(error?.response?.data?.msg));
    yield cbError?.(error?.response?.data?.msg);
    console.log(error);
  }
}

function* register({ username, password, cb, cbError }) {
  const { saveToLocal } = UseLocalStorage();

  try {
    const formData = { username, password };
    const { data } = yield call(AuthsService.register, {
      data: formData,
    });

    yield saveToLocal("token", data.token);
    yield put(
      AuthsAction.registerSucceeded({
        token: data.token,
        userData: data,
      })
    );
    yield cb?.();
  } catch (error) {
    yield put(AuthsAction.registerFailed(error?.response?.data?.msg));
    yield cbError?.(error?.response?.data?.msg);
    console.log(error);
  }
}

function* logout() {
  const { removeFromLocal } = UseLocalStorage();

  yield removeFromLocal("querySearch");
  yield removeFromLocal("token");
  yield removeFromLocal("isResetPassword");
  yield removeFromLocal("resetToken");
  yield put(AuthsAction.checkAuthenticationFailed());
}

function* checkAuthentication() {
  const { getFromLocal } = UseLocalStorage();

  try {
    const token = yield getFromLocal("token");
    const statusCode = yield call(getUserData);

    if (statusCode === 401 || !token) {
      yield call(logout);
    } else {
      const decodedToken = decoded(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        yield call(logout);
      } else {
        yield put(AuthsAction.checkAuthenticationSucceeded());
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* authsSaga() {
  yield takeLatest(types.CHECK_AUTHENTICATION.REQUEST, checkAuthentication);
  yield takeLatest(types.LOGIN.REQUEST, login);
  yield takeLatest(types.REGISTER.REQUEST, register);
  yield takeLatest(types.LOGOUT.ROOT, logout);
  yield takeLatest(types.GET_USER_DATA.REQUEST, getUserData);
}
