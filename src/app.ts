import express from "express";
import helmet from "helmet";
import cors from "cors";
import httpStatus from "http-status";
import courseCompletionRouter from "./course_completion";
import { errorConverter, errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError";
import morgan from "./config/morgan";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", courseCompletionRouter);

app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Resource not found."));
});

app.use(errorConverter);
app.use(errorHandler);
export { app };
