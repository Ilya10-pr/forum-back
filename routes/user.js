import { Router } from 'express';
import { deleteUser, getAllUsers, getUserById, updatePhoto, updateUser } from '../controllers/user.js';
import multer from '../middleware/multer.js';

export const user = Router()



user.get('/', getAllUsers);
user.get('/:id', getUserById);
user.put('/:id', updateUser);
user.delete('/:id', deleteUser);
user.put('/photo/:id',multer.single("file"), updatePhoto)
