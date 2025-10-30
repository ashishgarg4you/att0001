// src/routes/attendanceRoutes.js

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

// Public: Employee marks attendance via token
router.post("/mark-by-token", markAttendanceByToken);

// Public: Employee can view their last 5 attendance records
router.get("/history/:tokenCode", getAttendanceHistoryByToken);

/**
 * ===========================
 * 🔹 MANAGER ROUTES (Protected)
 * ===========================
 */

// Manager manually marks attendance (requires login)
router.post("/mark", protect, markAttendance);

// Manager views all attendance records
router.get("/", protect, getAttendance);

export default router;
