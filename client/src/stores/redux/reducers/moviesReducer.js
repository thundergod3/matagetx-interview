import produce from "immer";

import * as types from "constants/types";

const initialState = {
  movieList: {
    loading: false,
    data: [],
    error: "",
  },
  updateVoteMovie: {
    loading: false,
    error: "",
  },
  shareMovie: {
    loading: false,
    error: "",
  },
};

const moviesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_MOVIE_LIST.REQUEST: {
        draft.movieList.loading = true;
        break;
      }

      case types.GET_MOVIE_LIST.SUCCEEDED: {
        draft.movieList.loading = false;
        draft.movieList.data = action.movieList;
        draft.movieList.error = "";
        break;
      }

      case types.GET_MOVIE_LIST.FAILED: {
        draft.movieList.loading = false;
        draft.movieList.error = action.error;
        break;
      }

      case types.UPDATE_VOTE_MOVIE.REQUEST: {
        draft.updateVoteMovie.loading = true;
        break;
      }

      case types.UPDATE_VOTE_MOVIE.SUCCEEDED: {
        const newMovieList = draft?.movieList?.data?.map((record) =>
          record?.id === action?.data?.id ? action?.data : record
        );

        draft.updateVoteMovie.loading = false;
        draft.movieList.data = newMovieList;
        draft.updateVoteMovie.error = "";
        break;
      }

      case types.UPDATE_VOTE_MOVIE.FAILED: {
        draft.updateVoteMovie.loading = false;
        draft.updateVoteMovie.error = action.error;
        break;
      }

      case types.SHARE_MOVE.REQUEST: {
        draft.shareMovie.loading = true;
        break;
      }

      case types.SHARE_MOVE.SUCCEEDED: {
        draft.shareMovie.loading = false;
        draft.shareMovie.error = "";
        break;
      }

      case types.SHARE_MOVE.FAILED: {
        draft.shareMovie.loading = false;
        draft.shareMovie.error = action.error;
        break;
      }

      default:
        break;
    }
  });

export default moviesReducer;
