import { model, Schema } from "mongoose";
import { IMail } from "./mails.interface";

const mailSchema = new Schema<IMail>(
  {
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Mail = model<IMail>("Mail", mailSchema);
