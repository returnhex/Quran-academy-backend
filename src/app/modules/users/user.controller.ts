import { Request, Response, RequestHandler } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.createUserToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User created successfully",
      data: result,
    });
  }
);

const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.getAllUsersFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users retrieved Successfully",
      data: result,
    });
  }
);

const getOneUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One User retrieved Successfully",
      data: result,
    });
  }
);

const updateOneUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.updateSingleUserToDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One User updated Successfully",
      data: result,
    });
  }
);

const toggleUserStatus: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.toggleUserStatus(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User status updated Successfully",
      data: result,
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  toggleUserStatus,
};
