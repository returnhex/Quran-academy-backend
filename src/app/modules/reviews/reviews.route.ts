import express from "express";
import * as ReviewController from "./reviews.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.get("/", ReviewController.getAllReviews);
router.get(
  "/my-reviews",
  auth(USER_ROLE.student),
  ReviewController.getMyReviews
);
router.post("/", auth(USER_ROLE.student), ReviewController.createReview);
router.patch(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  ReviewController.changeStatus
);

export const reviewRouter = router;
