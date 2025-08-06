import { Schema, model } from "mongoose";
import { INotice } from "./notice.interface";

const noticeSchema = new Schema<INotice>(
  {
    heading: { type: String, required: true },
    body: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Notice = model<INotice>("Notice", noticeSchema);
