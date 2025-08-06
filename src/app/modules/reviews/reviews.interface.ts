import { Types } from "mongoose";

export interface IReview {
  user: Types.ObjectId;
  title: string;
  comment: string;
  name: string;
  designation: string;
  status: "approved" | "pending";
}
