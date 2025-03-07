const { DataTypes } = require("sequelize");
const { sequelize } = require("../connact");

const InformationUser = sequelize.define(
  "InformationUser",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusText: {
      type: DataTypes.STRING,
      // allowNull: true,
    },
    avatarUser: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    },
  },
  {
    tableName: "InformationUser",
    timestamps: false,
  }
);

module.exports = { InformationUser };
