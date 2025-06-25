const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  res.json({ message: 'User deleted' });
};

const changeUserRole = async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;
  await User.findByIdAndUpdate(userId, { role });
  res.json({ message: 'Role updated' });
};

module.exports = { getAllUsers, deleteUser, changeUserRole };
