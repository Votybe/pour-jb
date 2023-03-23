const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.send({ message: "All users deleted." });
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteAllUsers,
};
