const {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
} = require("../dataAccess/tasksDataAccess");




const getTasksServices = async (req) => {
    const tasks = await getTasks(req);
    return tasks;
};

const getTaskByIdServices = (id) => {
  return getTaskById(id);
};

const createTaskServices = async (req) => {
  return createTask(req);
};

const updateTaskServices = async (req) => {
  return updateTask(req);
};


const deleteTaskServices =  (req) => {
  return deleteTask(req);;
};


module.exports = {
  getTasksServices,
  getTaskByIdServices,
  createTaskServices,
  deleteTaskServices,
  updateTaskServices,
};
