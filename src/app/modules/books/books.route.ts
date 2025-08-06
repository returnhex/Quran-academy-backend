import express from "express";
import { BooksController } from "./books.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), BooksController.createBook);
router.get("/", BooksController.getAllBooks);
router.get("/:id", BooksController.getSingleBooks);
router.put("/:id", auth(USER_ROLE.admin), BooksController.updateBooks);
router.delete("/:id", auth(USER_ROLE.admin), BooksController.deleteBook);

export const BookRouter = router;
