import { Router } from "express";
import { createTopic,
  disLike,
  like,
  addPhoto,
  getAllTopics,
  getTopicById,
  deleteTopic } from "../controllers/topics.js";
import multer from "../middleware/multer.js";
import passport from "passport";

export const topic = Router()


topic.post('/',passport.authenticate('jwt', { session: false }), createTopic);
topic.get('/', getAllTopics);
topic.get('/:id', getTopicById);
topic.delete('/:id', deleteTopic);
topic.post('/photo',multer.single("file"), addPhoto);
topic.delete('/dislike/:id',passport.authenticate('jwt', { session: false }), disLike);
topic.post('/like/:id',passport.authenticate('jwt', { session: false }), like);
