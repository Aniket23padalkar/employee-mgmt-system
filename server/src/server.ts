import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
