import { Sequelize } from "sequelize";

import sequelize from "../configs/sequelize.js";

import hashPassword from "../../utils/hashPassword.js";

const UsersModel = sequelize.define("users", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: Sequelize.STRING, allowNull: false },
});

UsersModel.beforeCreate((user) => {
  const hashedPassword = hashPassword(user.password);
  user.password = hashedPassword;
});

export default UsersModel;
