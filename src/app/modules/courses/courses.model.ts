import { Schema, model } from "mongoose";
import { ICourse } from "./courses.interface";

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    img: String,
    fee: { type: Number, required: true },
    method: { type: String, required: true },
    duration: { type: String },
    details: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>("Course", courseSchema);
