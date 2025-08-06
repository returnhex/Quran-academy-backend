import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { BookRouter } from "../modules/books/books.route";
import { courseRouter } from "../modules/courses/courses.route";
import { noticeRouter } from "../modules/notice/notice.route";
import { reviewRouter } from "../modules/reviews/reviews.route";
import { StudentRouter } from "../modules/students/student.route";
import { teacherRouter } from "../modules/teachers/teachers.route";
import { userRouter } from "../modules/users/user.route";
import { mailRouter } from "../modules/mails/mails.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/books",
    route: BookRouter,
  },
  {
    path: "/courses",
    route: courseRouter,
  },

  {
    path: "/reviews",
    route: reviewRouter,
  },
  {
    path: "/notices",
    route: noticeRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/teachers",
    route: teacherRouter,
  },
  {
    path: "/mails",
    route: mailRouter,
  },
  {
    path: "/students",
    route: StudentRouter,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
