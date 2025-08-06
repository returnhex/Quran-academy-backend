import express from "express";
import { MailController } from "./mails.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.get("/", auth(USER_ROLE.admin), MailController.getAllMails);
router.post("/", auth(USER_ROLE.admin), MailController.createMail);

export const mailRouter = router;
