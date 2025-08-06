import { Schema, model } from "mongoose";
import { IReview } from "./reviews.interface";

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    status: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model<IReview>("Review", reviewSchema);
