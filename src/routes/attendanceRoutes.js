import express from "express";
import { markAttendance, getAttendance } from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mark", markAttendance); // Public for employees
router.get("/", protect, getAttendance); // Protected for managers

export default router;
