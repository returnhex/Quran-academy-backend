import express from "express";
import { NoticeController } from "./notice.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";
const router = express.Router();

router.post("/", auth(USER_ROLE.admin), NoticeController.createNotice);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.student),
  NoticeController.getAllNotices
);
router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.student),
  NoticeController.getSingleNotice
);
router.put("/:id", auth(USER_ROLE.admin), NoticeController.updateNotice);
router.delete("/:id", auth(USER_ROLE.admin), NoticeController.deleteNotice);

export const noticeRouter = router;
