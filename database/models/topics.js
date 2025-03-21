import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";

export const Topics = sequelize.define(
  'Topics', 
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    topic: DataTypes.STRING,
    idUser: DataTypes.UUID,
    photo: {
      type: DataTypes.STRING, 
      defaultValue: "https://cs.pikabu.ru/img_n/2012-09_6/nz8.jpg"
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    text: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0, 
    },
  },
  {
    tableName: "topics",
    timestamps: false,
  }
);