// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import { errorHandler } from "./middleware/errorMiddleware.js";

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.disable("x-powered-by");

// // Connect to DB
// mongoose.set("strictQuery", true);
// connectDB();

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/attendance", attendanceRoutes);

// // Health Check
// app.get("/", (req, res) => {
//   res.send("✅ Attendance App Backend Running...");
// });

// // Error Middleware
// app.use(errorHandler);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// );


// src/server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ FIX: Robust CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",           // local dev
      "https://attend-frontend.onrender.com", // replace with your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests (OPTIONS)
app.options("*", cors());

// Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

// ✅ Basic health route (for testing)
app.get("/", (req, res) => {
  res.send("✅ Attendance backend is running...");
});

// ✅ Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
