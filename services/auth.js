import bcrypt from "bcryptjs";
import { createToken } from "../config/createToken.js";
import { User } from "../database/models/users.js";


export const getAuthUserService = async (userId) => {
  try {
    const user = await User.findOne({
      where: {id: userId},
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return false;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const registerUserService = async (req) => {
  try {
    const candidate = await User.findOne({ where: { email: req.body.email } });
    if (candidate) {
      return false;
    }
    console.log(1)
    const salt = bcrypt.genSaltSync(10);
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    });
    const authUser = createToken(newUser);
    return authUser
  } catch (error) {
    console.log(error);
  }
};

export const loginUserService = async (req) => {
  const candidate = await User.findOne({ where: { email: req.body.email } });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const authUser = createToken(candidate)

      return authUser
    }
  }
  return false;
};