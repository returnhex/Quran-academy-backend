import { Course } from "./courses.model";
import { ICourse } from "./courses.interface";

const getAllCoursesDB = async () => {
  const result = Course.find({ isDeleted: false });
  return result;
};

const getSingleCourseDB = async (id: string) => {
  const course = await Course.findOne({ _id: id, isDeleted: false });
  if (!course) {
    throw new Error("Course not found or has been deleted!");
  }
  return course;
};

const createCourseDB = async (data: ICourse) => {
  const exists = await Course.findOne({ name: data.name });
  if (exists) {
    throw new Error("A course with this title already exists!");
  }
  return Course.create(data);
};

const updateCourseDB = async (id: string, data: Partial<ICourse>) => {
  const updated = await Course.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: data },
    { new: true }
  );
  if (!updated) {
    throw new Error("Unable to update: course not found or deleted!");
  }
  return updated;
};

const softDeleteCourseDB = async (id: string) => {
  const deleted = await Course.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );
  if (!deleted) {
    throw new Error("Unable to delete: course not found or already deleted!");
  }
  return deleted;
};

export const CourseServices = {
  getAllCoursesDB,
  getSingleCourseDB,
  createCourseDB,
  updateCourseDB,
  softDeleteCourseDB,
};
