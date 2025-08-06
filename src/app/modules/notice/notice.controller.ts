import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { NoticeServices } from "./notice.service";

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeServices.createNoticeDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Notice sent successfully",
    data: result,
  });
});

const getAllNotices = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeServices.getAllNoticesDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notices retrieved successfully",
    data: result,
  });
});

const getSingleNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeServices.getSingleNoticeDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice retrieved successfully",
    data: result,
  });
});

const updateNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeServices.updateNoticeDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice updated successfully",
    data: result,
  });
});

const deleteNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeServices.softDeleteNoticeDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice deleted successfully",
    data: result,
  });
});

export const NoticeController = {
  createNotice,
  getAllNotices,
  getSingleNotice,
  updateNotice,
  deleteNotice,
};
