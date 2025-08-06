import mongoose from "mongoose";
import { IStudent } from "./student.interface";

const StudentSchema = new mongoose.Schema<IStudent>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
    contact: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model<IStudent>("Student", StudentSchema);
