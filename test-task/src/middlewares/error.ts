import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import config from "../config/config";
import logger from "../config/logger";
import ApiError from "../utils/ApiError";

export const errorConverter: ErrorRequestHandler = (err, _req, _res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error instanceof Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : (err as { statusCode?: number }).statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = (error as Error).message || (httpStatus[statusCode as keyof typeof httpStatus] as string);
    error = new ApiError(statusCode, message, false, (error as Error).stack);
  }
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let { statusCode, message } = err as ApiError & { statusCode: number; message: string };
  if (config.env === "production" && !(err as ApiError).isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = (httpStatus[httpStatus.INTERNAL_SERVER_ERROR] as string) || "Internal Server Error";
  }

  res.locals.errorMessage = (err as Error).message;

  const response: Record<string, unknown> = {
    code: statusCode,
    message,
  };
  if (config.env === "development" && (err as Error).stack) {
    response.stack = (err as Error).stack;
  }

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
