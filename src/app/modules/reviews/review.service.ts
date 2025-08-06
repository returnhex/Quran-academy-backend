import ApiError from "../../utils/AppError";
import { Review } from "./reviews.model";
import { IReview } from "./reviews.interface";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

export const createReviewDB = async (data: IReview, user: JwtPayload) => {
  return Review.create({ ...data, user: user.userId });
};

export const getAllReviewsDB = async () => {
  return Review.find().sort({ createdAt: -1 });
};

export const getMyReviewsDB = async (user: JwtPayload) => {
  return Review.find({ user: user.userId }).sort({ createdAt: -1 });
};

export const changeStatus = async (
  id: string,
  payload: { status: "approved" | "pending" }
) => {
  const result = Review.findOneAndUpdate(
    { _id: id },
    { status: payload.status }
  );
  if (!result) throw new ApiError(httpStatus.OK, "Review Not Found or Deleted");
  return result;
};
