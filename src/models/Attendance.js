// import mongoose from "mongoose";

// const attendanceSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   date: { type: Date, default: Date.now },
//   status: { type: String, enum: ["Present", "Absent"], default: "Present" },
// });

// export default mongoose.model("Attendance", attendanceSchema);


import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: {
      type: Date,
      default: () => new Date(), // full timestamp
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export default mongoose.model("Attendance", attendanceSchema);
