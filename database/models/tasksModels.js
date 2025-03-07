const {DataTypes} = require("sequelize");
const {sequelize} = require("../connact")



const Task = sequelize.define(
  "Task",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    descriptionTask: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taskComplited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    activeTask: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Tasks",
    timestamps: false,
  }
);


module.exports = { Task };
