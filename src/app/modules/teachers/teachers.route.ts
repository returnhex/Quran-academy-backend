import express from "express";
import { TeacherController } from "./teachers.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";
const router = express.Router();

router.get("/", TeacherController.getAllTeachers);
router.post("/", auth(USER_ROLE.admin), TeacherController.createTeacher);
router.get("/:id", TeacherController.getSingleTeacher);
router.delete("/:id", auth(USER_ROLE.admin), TeacherController.deleteTeacher);
router.put("/:id", auth(USER_ROLE.admin), TeacherController.updateTeacher);

export const teacherRouter = router;
