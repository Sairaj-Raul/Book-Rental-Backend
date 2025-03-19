import express from "express";
import {
  createBook,
  getAllBooks,
  searchBooks,
} from "../controllers/book.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/creatBook", protectRoute, createBook);

router.get("/getAllBooks", protectRoute, getAllBooks);

router.get("/searchBooks", protectRoute, searchBooks);

export default router;
