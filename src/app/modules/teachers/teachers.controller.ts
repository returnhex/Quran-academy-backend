import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { TeacherServices } from "./teachers.service";
import { Request, Response } from "express";

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  console.log("Teacher add request: ", req.body);
  const result = await TeacherServices.createTeacherDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Teacher created successfully",
    data: result,
  });
});

// Get All
const getAllTeachers = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.getAllTeachersDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teachers retrieved successfully",
    data: result,
  });
});

// Get Single
const getSingleTeacher = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TeacherServices.getSingleTeacherDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher retrieved successfully",
    data: result,
  });
});

// Update
const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TeacherServices.updateTeacherDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher updated successfully",
    data: result,
  });
});

// Soft‑Delete
const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TeacherServices.DeleteSingleTeacherDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher deleted successfully",
    data: result,
  });
});

export const TeacherController = {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
