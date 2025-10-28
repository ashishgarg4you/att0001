import jwt from "jsonwebtoken";
import Manager from "../models/Manager.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerManager = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const managerExists = await Manager.findOne({ email });
    if (managerExists) return res.status(400).json({ message: "Manager already exists" });

    const manager = await Manager.create({ name, email, password });
    res.status(201).json({
      _id: manager.id,
      name: manager.name,
      email: manager.email,
      token: generateToken(manager.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email });
    if (!manager) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await manager.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: manager.id,
      name: manager.name,
      email: manager.email,
      token: generateToken(manager.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
