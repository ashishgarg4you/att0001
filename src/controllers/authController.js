// src/controllers/authController.js
import Manager from "../models/Manager.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerManager = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Manager.findOne({ email });
    if (existing) return res.status(400).json({ message: "Manager already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newManager = await Manager.create({ name, email, password: hashed });

    const token = jwt.sign({ id: newManager._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ message: "Manager registered", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    const manager = await Manager.findOne({ email });
    if (!manager) return res.status(400).json({ message: "Manager not found" });

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
