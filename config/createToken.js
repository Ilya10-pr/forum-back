import jwt from "jsonwebtoken";
import { keys } from "./keys.js";

export const createToken = (data) => {
  const payload = {id: data.id, email: data.email,role: data.role }
      const token = jwt.sign(payload, keys.secretOrKey, { expiresIn:"3h", algorithm: 'HS256'});
      const user = {
        token: 'Bearer ' + token,
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        role: data.role,
        status: data.status,
        avatarUser: data.avatarUser,
        listLikesTopics: data.listLikesTopics
    }
  return user
}