import {User} from "../database/models/users.js";


// export const createUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password,  } = req.body;
//     const user = await User.create({ firstName, lastName, status });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({attributes: { exclude: ['password', "email"] }});
    res.status(200).json(users);
  } catch (error) {
    console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Server is not responding" })
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Server is not responding" })
  }
};

export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, status } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.status = status || user.status;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Server is not responding" })
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({message: "Account successfully deleted"});
  } catch (error) {
    console.log(error)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Server is not responding" })
  }
};


export const updatePhoto = async (req, res) => {
  const path = req.file.path
  console.log(path)
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.avatarUser = path || user.avatarUser
    await user.save();
    console.log(user)
    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Server is not responding" })
  }

};
