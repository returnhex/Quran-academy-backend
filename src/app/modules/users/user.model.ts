import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      required: [true, "role is required"],
    },
    status: {
      type: String,
      enum: ["approved", "blocked"],
      default: "approved",
    },
    isDeleted: {
      type: Boolean,
      required: [true, "Deleted status is required"],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
