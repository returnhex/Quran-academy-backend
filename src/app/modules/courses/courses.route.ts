import express from "express";
import { CourseController } from "./courses.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), CourseController.createCourse);
router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getSingleCourses);
router.put("/:id", auth(USER_ROLE.admin), CourseController.updateCourses);
router.delete("/:id", auth(USER_ROLE.admin), CourseController.deleteCourse);

export const courseRouter = router;
