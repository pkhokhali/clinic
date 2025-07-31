import User from "../models/user.js";
const getAllUsers = async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
};

const registerNewUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(user);
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { role: req.body.role }, {
    new: true,
  });
  res.status(200).json(user);
};

const updatePermissions = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { permissions: req.body.permissions }, {
    new: true, 
  });
  res.status(200).json(user);
};

export { getAllUsers, registerNewUser, updateUser, updateRole, updatePermissions };