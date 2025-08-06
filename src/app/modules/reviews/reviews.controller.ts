import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import * as ReviewServices from "./review.service";
import { Request, Response } from "express";

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.createReviewDB(req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

export const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getAllReviewsDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});
export const getMyReviews = catchAsync(async (req: Request, res: Response) => {
  console.log("getMyReviews -> ", req.user);
  const result = await ReviewServices.getMyReviewsDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Reviews retrieved successfully",
    data: result,
  });
});

export const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewServices.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Approved!",
    data: result,
  });
});
