const { DataTypes } = require("sequelize");
const { sequelize } = require("../connact");


const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      // allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull: true,
    },
    avatarUser: {
      type: DataTypes.STRING,
      defaultValue:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    resetTokenExp: DataTypes.DATE,
    statusText: DataTypes.STRING,
  },
  {
    tableName: "users",
    timestamps: false,
  }
);


module.exports = { User };
