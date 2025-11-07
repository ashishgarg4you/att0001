import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tokenCode: { type: String, required: true, unique: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "Manager", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
