import express from "express";
import { registerManager, loginManager } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerManager);
router.post("/login", loginManager);

export default router;
