import express from "express";
import { StudentController } from "./student.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";
const router = express.Router();

router.get("/", auth(USER_ROLE.admin), StudentController.getAllStudents);
router.post("/", auth(USER_ROLE.admin), StudentController.createStudent);
router.get("/:id", auth(USER_ROLE.admin), StudentController.getSingleStudent);
router.get(
  "/user/:userId",
  auth(USER_ROLE.admin),
  StudentController.getSingleStudentUser
);
router.delete("/:id", auth(USER_ROLE.admin), StudentController.deleteStudent);
router.patch("/:id", auth(USER_ROLE.admin), StudentController.updateStudent);

export const StudentRouter = router;
