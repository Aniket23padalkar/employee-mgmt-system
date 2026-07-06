import express from "express";
import { verifyToken } from "../../middlewares/verify.token.middleware.js";
import { verifyAdmin } from "../../middlewares/verify.user.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { getAllEmployees } from "./admin.controller.js";

const router = express.Router();

router.get(
  "/all-employees",
  verifyToken,
  verifyAdmin,
  AsyncHandler(getAllEmployees),
);
