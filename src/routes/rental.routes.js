import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getPendingReturns,
  rentBook,
  returnBook,
} from "../controllers/rental.controller.js";

const router = express.Router();

router.post("/rentBook", protectRoute, rentBook);
router.post("/returnBook", protectRoute, returnBook);
router.get("/getAllPendingRetunr", protectRoute, getPendingReturns);
export default router;
