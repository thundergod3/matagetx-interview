import pkg from "sequelize";

import UsersModel from "../models/users.model.js";

// [GET]
export const getUserData = async (req, res) => {
  const user = await UsersModel.findOne({
    where: {
      id: req.user.id,
    },
  });

  delete user?.dataValues?.password;

  res.status(200).json(user);
};
