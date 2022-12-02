import authsRoute from "./auths.route.js";
import moviesRoute from "./movies.route.js";
import usersRoute from "./users.route.js";

const routes = (express) => {
  express.use("/auth", authsRoute);
  express.use("/users", usersRoute);
  express.use("/movies", moviesRoute);
};

export default routes;
