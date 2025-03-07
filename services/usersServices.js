const {
  getUserById,
  updateUser,
} = require("../dataAccess/usersDataAccess");
const bcrypt = require("bcryptjs");

const updateDataUserServices = async (req) => {
  
  if (req.body.lastPassword) {
    const candidate = await getUserById(req.userId);
    const passwordResult = bcrypt.compareSync(
      req.body.lastPassword,
      candidate.password
    );
    if (passwordResult) {
      const salt = bcrypt.genSaltSync(10);
      const newPassword = {
        password: bcrypt.hashSync(req.body.newPassword, salt),
      };
      const user = updateUser(req, newPassword);

      return user;
    }
    return false;
  }

  if (req.file) {
    const user = updateUser(req, { avatarUser: req.file.path });
    return user
  }
  const user = updateUser(req, req.body);

  return user;
};

module.exports = {
  updateDataUserServices,
};
