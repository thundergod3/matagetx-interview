import HTTPMethod from "./index";

class AuthsService {
  // [GET]
  getUserData = () => HTTPMethod.get("/users/me");

  // [POST]
  login = ({ data }) => HTTPMethod.post("/auth/login", data);
  register = ({ data }) => HTTPMethod.post("/auth/register", data);
}

export default new AuthsService();
