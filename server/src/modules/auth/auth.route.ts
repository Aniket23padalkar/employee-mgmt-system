import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { registerSchema } from "../../schemas/auth.schemas.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { registerUser } from "./auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  validateSchema(registerSchema),
  AsyncHandler(registerUser),
);
