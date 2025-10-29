import User from "../models/User.js";

export const addUser = async (req, res) => {
  try {
    const { name, tokenCode } = req.body;

    const existing = await User.findOne({ tokenCode });
    if (existing) return res.status(400).json({ message: "Token already in use" });

    const user = await User.create({ name, tokenCode, managerId: req.manager._id });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ managerId: req.manager._id });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
