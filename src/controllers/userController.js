import User from "../models/User.js";

// ➕ Add a new user
export const addUser = async (req, res) => {
  try {
    const { name, tokenCode } = req.body;

    if (!name || !tokenCode) {
      return res.status(400).json({ message: "Name and Token Code are required" });
    }

    const existing = await User.findOne({ tokenCode });
    if (existing) {
      return res.status(400).json({ message: "Token already in use" });
    }

    const user = await User.create({
      name,
      tokenCode,
      managerId: req.manager._id,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 Get all users for logged-in manager
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ managerId: req.manager._id }).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
      managerId: req.manager._id, // prevent deleting someone else's users
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
