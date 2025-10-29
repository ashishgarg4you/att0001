import express from "express";
import { addUser, getUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addUser);
router.get("/", protect, getUsers);

export default router;
