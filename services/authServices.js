const {
  getUserById,
  createUser,
  getUserOne,
  updateUser,
} = require("../dataAccess/usersDataAccess");
const { User } = require("../database/models/usersModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
require("dotenv").config();

const EXPIRES_IN = process.env.EXPIRES_IN;


const getAuthUserServices = async (userId) => {
  try {
    const user = await getUserById(userId);

    if (!user) {
      return;
    }
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      statusText: user.statusText,
      avatarUser: user.avatarUser
    };
    return userData;
  } catch (error) {
    console.log(error);
  }
};

const registerUserServices = async (req) => {
  try {
    const condidate = await getUserOne(req);
    if (condidate) {
      return false;
    }

    const salt = bcrypt.genSaltSync(10);
    const newUser = createUser(req, salt);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

const loginUserSevices = async (req) => {
  const candidate = await getUserOne(req);

  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate.id,
        },
        keys.jwt,
        { expiresIn: EXPIRES_IN }
      );

      return {
        token: `Bearer ${token}`,
        userId: candidate.id,
        email: candidate.email,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
      };
    }
  }
  return;
};


module.exports = {
  getAuthUserServices,
  registerUserServices,
  loginUserSevices,
};
