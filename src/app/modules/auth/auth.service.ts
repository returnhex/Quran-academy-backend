import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";
import { createEmailHtml } from "../../html/resetUI";
import { User } from "../users/user.model";
import ApiError from "../../utils/AppError";
import sendEmail from "../../utils/sendEmail";
import { IAuth } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";

export const loginUser = async (payload: IAuth) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
  if (user?.isDeleted)
    throw new ApiError(httpStatus.UNAUTHORIZED, "User is Deleted");
  if (user?.status === "blocked")
    throw new ApiError(httpStatus.FORBIDDEN, "User is Blocked");

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isPasswordMatched)
    throw new ApiError(httpStatus.FORBIDDEN, "Password did not matched!");
  const jwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    status: user.status,
    name: user.name,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    Number(config.jwt_access_expiresIn)
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    Number(config.jwt_refresh_expiresIn)
  );

  return {
    accessToken,
    refreshToken,
    userRole: user.role,
    id: user._id,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findById(userData.userId).select("+password");
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");

  if (user?.isDeleted) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User is Deleted");
  }
  if (user?.status == "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "User is Blocked");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );
  if (!isPasswordMatched)
    throw new ApiError(httpStatus.FORBIDDEN, "Password did not matched!");

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.saltRound)
  );

  const result = await User.findOneAndUpdate(
    {
      _id: userData.userId,
      role: userData.role,
    },
    { password: newHashPassword }
  );
  return result;
};

const refreshToken = async (token: string) => {
  if (!token)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Token not Found. Unauthorized User!"
    );
  const decoded = verifyToken(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;
  if (!decoded)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Couldn't verify the token. Unauthorized User!"
    );

  const { userId } = decoded;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
  if (user.isDeleted)
    throw new ApiError(httpStatus.NOT_FOUND, "User is Deleted");
  if (user.status === "blocked")
    throw new ApiError(httpStatus.NOT_FOUND, "User is blocked");

  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    Number(config.jwt_access_expiresIn)
  );

  return { newAccessToken: newAccessToken };
};

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
  if (user.isDeleted)
    throw new ApiError(httpStatus.NOT_FOUND, "User is deleted");
  if (user.status == "blocked")
    throw new ApiError(httpStatus.NOT_FOUND, "User is blocked");

  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const resetPassToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    600
  );

  const resetUILink = `${process.env.RESET_PASS_UI_LINK}?id=${user?._id}&token=${resetPassToken}`;
  const resetUI = createEmailHtml(user?.name, resetUILink);
  sendEmail(user?.email, "Reset your password", resetUI);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const user = await User.findById(payload.id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
  if (user.isDeleted)
    throw new ApiError(httpStatus.NOT_FOUND, "User is deleted");
  if (user.status == "blocked")
    throw new ApiError(httpStatus.NOT_FOUND, "User is blocked");

  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;
  if (payload.id !== decoded.userId)
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access!");

  const hashNewPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.saltRound)
  );
  await User.findOneAndUpdate(
    {
      _id: decoded.userId,
      role: decoded.role,
    },
    { password: hashNewPassword }
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
