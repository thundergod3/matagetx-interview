import { fork, all } from "redux-saga/effects";

import authsSaga from "./authsSaga";
import moviesSaga from "./moviesSaga";

export default function* rootSaga() {
  yield all([fork(authsSaga), fork(moviesSaga)]);
}
