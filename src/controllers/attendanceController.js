import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

export const markAttendance = async (req, res) => {
  try {
    const { tokenCode } = req.body;

    const user = await User.findOne({ tokenCode });
    if (!user) return res.status(404).json({ message: "Invalid token" });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const alreadyMarked = await Attendance.findOne({
      userId: user._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "Already marked attendance today" });
    }

    const attendance = await Attendance.create({ userId: user._id });
    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("userId", "name tokenCode");
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
