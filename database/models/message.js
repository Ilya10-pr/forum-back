// models/Message.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../connact.js';

export const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
  },
  authUserId: {
    type: DataTypes.UUID, 
    allowNull: false,
  },
  selectedUserId: {
    type: DataTypes.UUID, 
    defaultValue: ""
  },
  authUserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedUserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authAvatar: DataTypes.STRING,
  selectedAvatar: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

