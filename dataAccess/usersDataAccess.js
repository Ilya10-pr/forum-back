const { User } = require("../database/models/usersModels");
const bcrypt = require("bcryptjs");


const getUserById = (userId) => {
  return User.findByPk(userId);
};

const getUserOne = (req) => {
  return User.findOne({ where: { email: req.body.email } });
}


const createUser = async (req, salt) => {
  return await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  });
}


const updateUser = (req, data) => {
  return User.update(data, {
    where: { id: req.userId },
  }).then(() => {
    return getUserById(req.userId);
  });
}

module.exports = { getUserById, getUserOne, createUser, updateUser };