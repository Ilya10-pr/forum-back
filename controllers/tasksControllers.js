const HttpStatus = require("http-status-codes");
const {
  getTasksServices,
  getTaskByIdServices,
  createTaskServices,
  updateTaskServices,
  deleteTaskServices,
} = require("../services/tasksServices")



const getTasksController = async (req, res) => {
  const tasks = await getTasksServices(req);

  return res.status(HttpStatus.OK).json(tasks);

};

const getTasksByIdController = async (req, res) => {
  const task = await getTaskByIdServices(req.params.id);
  return res.status(HttpStatus.OK).json(task);
};


const createTaskController = async (req, res) => {
  if(!req.body.descriptionTask){
    return res.sendStatus(HttpStatus.BAD_REQUEST)
  }
  const task = await createTaskServices(req);

  res.status(HttpStatus.CREATED).json(task);
};


const updateTaskController = async (req, res) => {
  const updateTask = await updateTaskServices(req)
  return res.status(HttpStatus.OK).json(updateTask);
};


const deleteTaskController = async (req, res) => { 
  const inactiveTasks = await deleteTaskServices(req);
  return res.status(HttpStatus.OK).json(inactiveTasks);
};


module.exports = {
  getTasksController,
  getTasksByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
};