import ApiError from "../../utils/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { Student } from "../students/student.model";
import { config } from "../../config";

const createUserToDB = async (payload: IUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser)
    throw new ApiError(httpStatus.CONFLICT, "User Already Exists");
  const hashPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.saltRound)
  );
  payload.password = hashPassword;

  const result = await User.create(payload);
  const userData = {
    name: payload.name,
    email: payload.email,
    user: result._id,
  };

  await Student.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id, { isDeleted: false });
  console.log(result);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  return result;
};

const updateSingleUserToDB = async (id: string, payload: Partial<IUser>) => {
  const isUserExists = await User.findById(id, { isDeleted: false });
  if (!isUserExists) throw new ApiError(httpStatus.CONFLICT, "User Not Found!");
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const toggleUserStatus = async (id: string, status: string) => {
  const isUserExists = await User.findById(id);
  if (!isUserExists) throw new ApiError(httpStatus.CONFLICT, "User Not Found!");
  const result = await User.findByIdAndUpdate(
    id,
    { status: status },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const UserServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserToDB,
  toggleUserStatus,
};
