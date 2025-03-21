import { Topics } from "../database/models/topics.js";
import { User } from "../database/models/users.js";


export const createTopic = async (req, res) => {
  
  try {
    const idUser = req.user.id
    const { title, text, id, topicName } = req.body;
    const topic = await Topics.findByPk(id);
    topic.title = title || topic.title
    topic.text = text || topic.text
    topic.idUser = idUser || topic.idUser
    topic.topic = topicName || topic.topic
    await topic.save();
    const topics = await Topics.findAll();
    if(!topics){
      return res.status(404).json({message: "Topcs not found"})
    }
    return res.status(201).json(topics);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server is not responding" })
  }
};

export const disLike = async (req, res) => {
  try {
    const id = req.params.id
    const topic = await Topics.findByPk(id);
    topic.likes -= 1
    await topic.save();
    const user = await User.findByPk(req.user.id);
    const arrLike = user.listLikesTopics.split(", ")
    const newArr = arrLike.filter((item) => item != id)
    console.log(newArr)
    user.listLikesTopics = newArr.join(", ")
    await user.save()
    return res.status(201).json(topic);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server is not responding" })
  }
};

export const like = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const topic = await Topics.findByPk(id);
    topic.likes += 1
    await topic.save();
    const user = await User.findByPk(req.user.id);
    const strLike = user.listLikesTopics === "" ?  id : user.listLikesTopics + ", " + id;
    user.listLikesTopics = strLike;
    await user.save()
    console.log(user)
    return res.status(201).json(topic);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server is not responding" })
  }
};

export const addPhoto = async (req, res) => {
  const path = req.file.path
  try {
    const topic = await Topics.create({ photo: path });
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    return res.status(200).json(topic);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server is not responding" })
  }

};


export const getAllTopics = async (req, res) => {
  try {
    const topic = await Topics.findAll();
    res.status(200).json(topic);
  } catch (error) {
    console.log(error)
      return res.status(500).json({ message: "Server is not responding" })
  }
}; 

export const getTopicById = async (req, res) => {
  try { 
    const topic = await Topics.findByPk(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.status(200).json(topic);
  } catch (error) {
    console.log(error)
      return res.status(500).json({ message: "Server is not responding" })
  }
};

// export const updateTopic = async (req, res) => {
//   try {
//     const { photo, title, text, likes, topicName } = req.body;
//     const topic = await Topics.findByPk(req.params.id);
//     if (!topic) {
//       return res.status(404).json({ message: 'Topic not found' });
//     }
//     topic.photo = photo || topic.photo;
//     topic.title = title || topic.title;
//     topic.text = text || topic.text;
//     topic.likes = likes || topic.likes;
//     topic.topic = topicName || topic.topic;
//     await topic.save();
//     res.status(200).json(topic);
//   } catch (error) {
//     console.log(error)
//       return res.status(500).json({ message: "Server is not responding" })
//   }
// };

export const deleteTopic = async (req, res) => {
  try {
    console.log(req.params.id)
    const topic = await Topics.findByPk(req.params.id);
    console.log(topic)
    if (!topic) {
      return res.status(404).json({message: "Topic not deleted"});
    }
    await topic.destroy();
    const topics = await Topics.findAll();

    res.status(200).json(topics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 