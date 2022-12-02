import generateToken from "../../utils/generateToken.js";
import validatePassword from "../../utils/validatePassword.js";

import UsersModel from "../models/users.model.js";

// [POST]
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({
    where: {
      email,
    },
  });

  if (user && validatePassword(password, user.password)) {
    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      roles: user.roles,
      status: user.status,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({
      msg: "Invalid email or password",
    });
  }
};
export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const userExists = await UsersModel.findOne({
    where: {
      email,
    },
  });

  if (userExists) {
    res.status(401).json({
      msg: "User already existed. Please try again with another email",
    });
  } else {
    const user = await UsersModel.create({
      fullName,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        roles: user.roles,
        status: user.status,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({
        msg: "Invalid user data. Please try again",
      });
    }
  }
};
