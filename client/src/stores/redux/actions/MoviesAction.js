import * as types from "constants/types";

class MoviesAction {
  getMovieListRequest = () => ({
    type: types.GET_MOVIE_LIST.REQUEST,
  });
  getMovieListSucceeded = ({ movieList }) => ({
    type: types.GET_MOVIE_LIST.SUCCEEDED,
    movieList,
  });
  getMovieListFailed = (error) => ({
    type: types.GET_MOVIE_LIST.FAILED,
    error,
  });

  updateVoteMovieRequest = (id, voteType) => ({
    type: types.UPDATE_VOTE_MOVIE.REQUEST,
    id,
    voteType,
  });
  updateVoteMovieSucceeded = ({ data }) => ({
    type: types.UPDATE_VOTE_MOVIE.SUCCEEDED,
    data,
  });
  updateVoteMovieFailed = (error) => ({
    type: types.UPDATE_VOTE_MOVIE.FAILED,
    error,
  });

  shareMovieRequest = (formData, cb, cbError) => ({
    type: types.SHARE_MOVE.REQUEST,
    formData,
    cb,
    cbError,
  });
  shareMovieSucceeded = () => ({
    type: types.SHARE_MOVE.SUCCEEDED,
  });
  shareMovieFailed = (error) => ({
    type: types.SHARE_MOVE.FAILED,
    error,
  });
}

export default new MoviesAction();
