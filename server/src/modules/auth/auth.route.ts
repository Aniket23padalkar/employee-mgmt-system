import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { registerSchema } from "../../schemas/auth.schemas.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { registerUser } from "./auth.controller.js";
import { registerLimiter } from "../../middlewares/ratelimiter.middleware.js";

const router = express.Router();

router.post(
  "/register",
  registerLimiter,
  validateSchema(registerSchema),
  AsyncHandler(registerUser),
);
