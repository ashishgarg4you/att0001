import Manager from "../models/Manager.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ✅ Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ✅ Register Manager
export const registerManager = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Manager.findOne({ email });
    if (existing) return res.status(400).json({ message: "Manager already exists" });

    const newManager = await Manager.create({ name, email, password });
    const token = generateToken(newManager._id);

    res.status(201).json({ message: "Manager registered", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Manager Login
export const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email });

    if (!manager) return res.status(400).json({ message: "Manager not found" });

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(manager._id);
    res.json({ token, manager });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Employee Login (NEW)
export const loginEmployee = async (req, res) => {
  try {
    const { tokenCode } = req.body;
    if (!tokenCode)
      return res.status(400).json({ message: "Token code required" });

    const user = await User.findOne({ tokenCode });
    if (!user)
      return res.status(400).json({ message: "Invalid token code" });

    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
