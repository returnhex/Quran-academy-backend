import ApiError from "../../utils/AppError";
import httpStatus from "http-status";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";
//create
const createStudentToDB = async (payload: IStudent) => {
  const existingStudent = await Student.findOne({ email: payload.email });
  if (existingStudent)
    throw new ApiError(httpStatus.CONFLICT, "Student Already Exists");
  const result = await Student.create(payload);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({ isDeleted: false });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id, { isDeleted: false });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Student Not Found");
  return result;
};

const getSingleStudentUserFromDB = async (id: string) => {
  const result = await Student.findOne({ user: id, isDeleted: false });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Student Not Found");
  return result;
};

const updateSingleStudentToDB = async (id: string, payload: Partial<IStudent>) => {
  const isUserExists = await Student.findById(id, { isDeleted: false });
  if (!isUserExists)
    throw new ApiError(httpStatus.CONFLICT, "Student Not Found!");
  const result = await Student.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleStudentToDB = async (id: string) => {
  const isUserExists = await Student.findById(id, { isDeleted: false });
  if (!isUserExists)
    throw new ApiError(httpStatus.CONFLICT, "Student Not Found!");
  const result = await Student.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const StudentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getSingleStudnetFromDB: getSingleStudentFromDB,
  getSingleStudnetUserFromDB: getSingleStudentUserFromDB,
  updateSingleStudentToDB,
  deleteSingleStudentToDB,
};
