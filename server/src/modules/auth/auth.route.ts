import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { loginSchema, registerSchema } from "../../schemas/auth.schemas.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "./auth.controller.js";
import {
  loginLimiter,
  registerLimiter,
} from "../../middlewares/ratelimiter.middleware.js";

const router = express.Router();

router.post(
  "/register",
  registerLimiter,
  validateSchema(registerSchema),
  AsyncHandler(registerUser),
);

router.post(
  "/login",
  loginLimiter,
  validateSchema(loginSchema),
  AsyncHandler(loginUser),
);

router.post("/refresh-token", AsyncHandler(refreshAccessToken));

export default router;
