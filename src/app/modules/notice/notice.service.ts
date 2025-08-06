import { Notice } from "./notice.model";
import { INotice } from "./notice.interface";

const getAllNoticesDB = async () => {
  const result = await Notice.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return result;
};

const getSingleNoticeDB = async (id: string) => {
  const notice = await Notice.findOne({ _id: id, isDeleted: false });
  if (!notice) {
    throw new Error("Notice not found or has been deleted!");
  }
  return notice;
};

const createNoticeDB = async (data: INotice) => {
  const exists = await Notice.findOne({ heading: data.heading });
  if (exists) {
    throw new Error("A notice with this heading already exists!");
  }
  return Notice.create({ ...data, isDeleted: false });
};

const updateNoticeDB = async (id: string, data: Partial<INotice>) => {
  const updated = await Notice.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: data },
    { new: true }
  );
  if (!updated) {
    throw new Error("Unable to update: notice not found or deleted!");
  }
  return updated;
};

const softDeleteNoticeDB = async (id: string) => {
  const deleted = await Notice.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );
  if (!deleted) {
    throw new Error("Unable to delete: notice not found or already deleted!");
  }
  return deleted;
};

export const NoticeServices = {
  getAllNoticesDB,
  getSingleNoticeDB,
  createNoticeDB,
  updateNoticeDB,
  softDeleteNoticeDB,
};
