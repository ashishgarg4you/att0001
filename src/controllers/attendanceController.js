import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

// 🔹 Admin: Mark attendance manually
export const markAttendance = async (req, res) => {
  try {
    const { tokenCode } = req.body;
    const user = await User.findOne({ tokenCode });
    if (!user) return res.status(404).json({ message: "Invalid token" });

    const now = new Date();
    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));

    const alreadyMarked = await Attendance.findOne({
      userId: user._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "Already marked attendance today" });
    }

    const attendance = await Attendance.create({
      userId: user._id,
      status: "Present",
    });

    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Admin: Get all attendance records
export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("userId", "name tokenCode");
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Employee: Mark attendance using token code
export const markAttendanceByToken = async (req, res) => {
  try {
    const { tokenCode } = req.body;
    if (!tokenCode) return res.status(400).json({ message: "Token code required" });

    const user = await User.findOne({ tokenCode });
    if (!user) return res.status(404).json({ message: "Invalid token code" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyMarked = await Attendance.findOne({
      userId: user._id,
      date: { $gte: today },
    });

    if (alreadyMarked)
      return res.status(400).json({ message: "Attendance already marked for today" });

    const attendance = await Attendance.create({
      userId: user._id,
      status: "Present",
    });

    res.json({
      message: `Attendance marked successfully for ${user.name}`,
      user: user.name,
      date: attendance.date,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Employee: View last 5 attendance records
export const getAttendanceHistoryByToken = async (req, res) => {
  try {
    const { tokenCode } = req.params;
    const user = await User.findOne({ tokenCode });
    if (!user) return res.status(404).json({ message: "Invalid token code" });

    const records = await Attendance.find({ userId: user._id })
      .sort({ date: -1 })
      .limit(5);

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
};
