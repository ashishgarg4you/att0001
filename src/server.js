// src/server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Security & Utility Middleware
app.use(helmet());
app.use(express.json());

// ✅ CORS Setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://attend-frontend.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Logging
app.use(morgan("dev"));

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("✅ Attendance backend running successfully...");
});

// ✅ Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res
    .status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500)
    .json({
      message: err.message || "Server Error",
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
