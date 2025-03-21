import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";


export const Comments = sequelize.define('Comments', {
  id: {
    type: DataTypes.UUID, // Используем UUID
    defaultValue: DataTypes.UUIDV4, // Генерация UUID по умолчанию
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID, 
  },
  themsId: {
    type: DataTypes.UUID, 
  },
  avatarUser: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0, 
  },
  role: DataTypes.STRING
});
