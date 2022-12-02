import { Router } from "express";
import asyncHandler from "express-async-handler";

import { login, register } from "../app/controllers/auths.controller.js";

const authsRoute = Router();

// [GET]

// [POST]
authsRoute.post("/login", asyncHandler(login));
authsRoute.post("/register", asyncHandler(register));

export default authsRoute;
