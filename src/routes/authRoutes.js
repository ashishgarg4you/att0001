import express from "express";
import {
  loginManager,
  registerManager,
  loginEmployee,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerManager);
router.post("/login", loginManager);
router.post("/employee-login", loginEmployee);

export default router;
