const { Task } = require("../database/models/tasksModels");

const getTasks = (req) => {
  return Task.findAll({where: {userId: req.userId} });
};

const getTaskById = (id) => {
  return Task.findByPk(id);
};

const createTask = (req) => {
  return Task.create({
    descriptionTask: req.body.descriptionTask,
    userId: req.userId
  })
};

const updateTask = (req) => {
  return Task.update(req.body, { where: req.params }).then(() => {
    return getTaskById(req.params.id);
  });
};

const deleteTask = async (req) => {

  return Task.update({ activeTask: false }, { where: req.params });
  
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
};
