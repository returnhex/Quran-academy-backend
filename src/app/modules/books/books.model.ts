import { Schema, model } from "mongoose";
import { IBook } from "./books.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String },
    description: { type: String },
    cover: { type: String, required: true },
    url: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook>("Book", bookSchema);
