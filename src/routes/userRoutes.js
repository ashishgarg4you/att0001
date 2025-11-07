import express from "express";
import {
  addUser,
  getUsers,
  deleteUser
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected routes
router.post("/", protect, addUser);
router.get("/", protect, getUsers);
router.delete("/:id", protect, deleteUser);

export default router;
