import { takeLatest, put, call } from "redux-saga/effects";

import * as types from "constants/types";
import MoviesAction from "stores/redux/actions/MoviesAction";
import MoviesService from "services/MoviesService";

function* getMovieList() {
  try {
    yield;
    const { data } = yield call(MoviesService.getMovieList);

    yield put(MoviesAction.getMovieListSucceeded({ movieList: data }));
  } catch (error) {
    console.log(error);
    yield put(MoviesAction.getMovieListFailed(error?.response?.data?.message));
    return error?.response?.status;
  }
}

function* updateVoteMovie({ id, voteType }) {
  try {
    yield;
    const { data } = yield call(MoviesService.updateVoteMovie, {
      id,
      data: { voteType },
    });

    yield put(MoviesAction.updateVoteMovieSucceeded({ data }));
  } catch (error) {
    console.log(error);
    yield put(
      MoviesAction.updateVoteMovieFailed(error?.response?.data?.message)
    );
    return error?.response?.status;
  }
}

function* shareMovie({ formData, cb, cbError }) {
  try {
    yield;
    yield call(MoviesService.shareMovie, {
      data: formData,
    });
    yield put(MoviesAction.shareMovieSucceeded());
    yield cb?.();
  } catch (error) {
    console.log(error);
    yield put(MoviesAction.shareMovieFailed(error?.response?.data?.message));
    yield cbError?.();
    return error?.response?.status;
  }
}

export default function* moviesSaga() {
  yield takeLatest(types.GET_MOVIE_LIST.REQUEST, getMovieList);
  yield takeLatest(types.UPDATE_VOTE_MOVIE.REQUEST, updateVoteMovie);
  yield takeLatest(types.SHARE_MOVE.REQUEST, shareMovie);
}
