// src/server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";

// ✅ Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Security & Utility Middleware
app.use(helmet());
app.use(express.json());

// ✅ Allowed Origins (No trailing slashes)
const allowedOrigins = [
  "http://localhost:5173",               // Local development
  "https://kammmmyour.netlify.app",      // (Your test frontend)
  "https://att0001.onrender.com",        // (Your backend API)
  "https://attend-frontend.onrender.com",// (Optional old frontend)
  "https://adminhrforyou.netlify.app"    // ✅ Production frontend (Fixed)
];

// ✅ CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      // Normalize origin (remove trailing slash if exists)
      const cleanOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(cleanOrigin)) {
        callback(null, true);
      } else {
        console.error("❌ CORS Rejected Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Logging Middleware
app.use(morgan("dev"));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

// ✅ Health Check
app.get("/", (req, res) => {
  res.status(200).send("✅ Attendance backend running successfully...");
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
