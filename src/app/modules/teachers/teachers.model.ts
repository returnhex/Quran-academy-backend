import mongoose, { model, Schema } from "mongoose";
import { ITeacher } from "./teachers.interface";

const teacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true },
    subject: { type: String },
    education: { type: String },
    gender: { type: String, enum: ["male", "female"], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Teacher = model<ITeacher>("Teacher", teacherSchema);
