import HttpStatus from "http-status-codes";
import dotenv from "dotenv";
import { getAuthUserService, loginUserService, registerUserService } from "../services/auth.js";


dotenv.config()



export const authMeController = async (req, res) => {
  try {
    const user = await getAuthUserService(req.user.id);
    if(!user){
      return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" })
    }
    return res.status(HttpStatus.OK).json(user);
  }
    catch(error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Server is not responding" })
    }
}


export const registerUserController = async (req, res) => {

  const candidate = await registerUserService(req);
try {
  if(!candidate) {
    return  res.status(HttpStatus.CONFLICT).json({
      message: "Email already exists",
    });
  }

  return res.status(HttpStatus.CREATED).json(candidate);
} catch (error) {
  console.log(error)
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Server is not responding" })
}
  
};


export const loginUserController = async (req, res) => {

    const condidate = await loginUserService(req);
try {
  if(condidate) {
    return res.status(HttpStatus.OK).json(condidate);
  }
  return res
    .status(HttpStatus.UNAUTHORIZED)
    .json({ message: "User not unauthorized" });
  
} catch (error) {
  console.log(error)
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Server is not responding" })
}
}

