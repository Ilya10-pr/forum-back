import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";


export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    avatarUser: {
      type: DataTypes.STRING,
      defaultValue:
        "",
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "guest"
    },
    listLikesTopics: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);


