const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models/usersModels");
const keys = require("../config/keys");
const { getAuthUserServices, registerUserServices, loginUserSevices } = require("../services/authServices");
require("dotenv").config(); 



const authMeController = async (req, res) => {
  try {
    const user = await getAuthUserServices(req.userId);
    if(!user){
      return res.status(HttpStatus.NOT_FOUND).json({ message: "User not find" })
    }
    return res.status(HttpStatus.OK).json(user);
  }
    catch(error) {
      console.log(error)
    }
}


const registerUserController = async (req, res) => {

  const condidate = await registerUserServices(req);

  if(!condidate) {
    return  res.status(HttpStatus.CONFLICT).json({
      message: "Email already exists",
    });
  }

  return res.status(HttpStatus.CREATED).json(condidate);
  
};


const loginUserController = async (req, res) => {

    const condidate = await loginUserSevices(req);

    if(condidate) {
      return res.status(HttpStatus.OK).json(condidate);
    }
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "User not unauthorized" });
}




module.exports = {
  registerUserController,
  loginUserController, 
  authMeController,
};