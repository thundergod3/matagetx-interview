import HTTPMethod from "./index";

class AuthsService {
  // [GET]
  getMovieList = () => HTTPMethod.get("/movies");

  // [POST]
  shareMovie = ({ data }) => HTTPMethod.post("/movies/share", data);

  // [POST]
  updateVoteMovie = ({ id, data }) =>
    HTTPMethod.put(`/movies/vote/${id}`, data);
}

export default new AuthsService();
