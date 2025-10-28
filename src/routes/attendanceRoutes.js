import express from "express";
import { markAttendance, getAttendance } from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/mark", markAttendance);  // public for users with token
router.get("/", protect, getAttendance); // managers only

export default router;
