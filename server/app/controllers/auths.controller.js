import generateToken from "../../utils/generateToken.js";
import validatePassword from "../../utils/validatePassword.js";

import UsersModel from "../models/users.model.js";

// [POST]
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UsersModel.findOne({
    where: {
      username,
    },
  });

  if (user && validatePassword(password, user.password)) {
    res.status(200).json({
      id: user.id,
      username: user.username,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({
      msg: "Invalid username or password",
    });
  }
};
export const register = async (req, res) => {
  const { fullName, username, password } = req.body;
  const userExists = await UsersModel.findOne({
    where: {
      username,
    },
  });

  if (userExists) {
    res.status(401).json({
      msg: "User already existed. Please try again with another username",
    });
  } else {
    const user = await UsersModel.create({
      fullName,
      username,
      password,
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        username: user.username,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({
        msg: "Invalid user data. Please try again",
      });
    }
  }
};
