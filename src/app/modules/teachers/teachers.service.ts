import httpStatus from "http-status";
import ApiError from "../../utils/AppError";
import sendEmail from "../../utils/sendEmail";
import { Student } from "../students/student.model";
import { ITeacher } from "./teachers.interface";
import { Teacher } from "./teachers.model";

const getAllTeachersDB = async () => {
  return Teacher.find({ isDeleted: false });
};

const getSingleTeacherDB = async (id: string) => {
  const teacher = await Teacher.findOne({ _id: id, isDeleted: false });
  if (!teacher) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Teacher not found or has been deleted!"
    );
  }
  return teacher;
};

const createTeacherDB = async (payload: ITeacher) => {
  const result = await Teacher.create(payload);
  return result;
};

const updateTeacherDB = async (id: string, payload: Partial<ITeacher>) => {
  const isTeacherExists = await Teacher.findById(id);
  if (!isTeacherExists)
    throw new ApiError(httpStatus.NOT_FOUND, "Teacher Not Found!");
  const result = await Teacher.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const DeleteSingleTeacherDB = async (id: string) => {
  const isUserExists = await Teacher.findById(id);
  if (!isUserExists)
    throw new ApiError(httpStatus.NOT_FOUND, "Teacher Not Found!");
  const result = await Teacher.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const TeacherServices = {
  getAllTeachersDB,
  getSingleTeacherDB,
  createTeacherDB,
  updateTeacherDB,
  DeleteSingleTeacherDB,
};
