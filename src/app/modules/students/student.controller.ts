import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { StudentServices } from "./student.service";
import { Request, Response } from "express";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.createStudentToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

// Get All
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students retrieved successfully",
    data: result,
  });
});

// Get Single
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentServices.getSingleStudnetFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
});

const getSingleStudentUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId;
  const result = await StudentServices.getSingleStudnetUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
});

// Update
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentServices.updateSingleStudentToDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

// Soft‑Delete
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentServices.deleteSingleStudentToDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  getSingleStudentUser,
  updateStudent,
  deleteStudent,
};
