import { Sequelize } from "sequelize";

import sequelize from "../configs/sequelize.js";

const MoviesModel = sequelize.define("movies", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  url: { type: Sequelize.STRING, allowNull: false },
  title: { type: Sequelize.STRING, allowNull: false },
  sharedBy: { type: Sequelize.STRING, allowNull: false },
  votedUpCount: { type: Sequelize.NUMBER, allowNull: false, defaultValue: 0 },
  votedDownCount: { type: Sequelize.NUMBER, allowNull: false, defaultValue: 0 },
  description: { type: Sequelize.TEXT, allowNull: false },
  votedUpUserList: {
    type: Sequelize.JSONB,
    allowNull: false,
    defaultValue: [],
  },
  votedDownUserList: {
    type: Sequelize.JSONB,
    allowNull: false,
    defaultValue: [],
  },
});

export default MoviesModel;
