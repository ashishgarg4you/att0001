import express from "express";
import { loginManager, registerManager } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginManager);
router.post("/register", registerManager);

export default router;
