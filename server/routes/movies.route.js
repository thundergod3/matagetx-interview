import { Router } from "express";
import asyncHandler from "express-async-handler";

import { authentication } from "../middlewares/authentications.js";

import {
  getMovieList,
  shareMovie,
  updateVoteMovie,
} from "../app/controllers/movies.controller.js";

const moviesRoute = Router();

// [GET]
moviesRoute.get("/", asyncHandler(getMovieList));

// [POST]
moviesRoute.post("/share", authentication, asyncHandler(shareMovie));

// [PUT]
moviesRoute.put("/vote/:id", authentication, asyncHandler(updateVoteMovie));

export default moviesRoute;
