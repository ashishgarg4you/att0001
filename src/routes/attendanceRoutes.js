import express from "express";
import {
  markAttendance,
  getAttendance,
  markAttendanceByToken,
  getAttendanceHistoryByToken,
} from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ===========================
 * 🔹 EMPLOYEE ROUTES (Public)
 * ===========================
 */

// Employee marks attendance using token code
router.post("/mark-by-token", markAttendanceByToken);

// Employee views their last 5 attendance records
router.get("/history/:tokenCode", getAttendanceHistoryByToken);

/**
 * ===========================
 * 🔹 MANAGER ROUTES (Protected)
 * ===========================
 */

// Manager can mark attendance manually
router.post("/mark", protect, markAttendance);

// Manager can view all attendance records
router.get("/", protect, getAttendance);

export default router;
