import httpStatus from 'http-status';
import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";
import pick from "../utils/pick";
import Joi from "joi";

type SchemaKeys = "params" | "query" | "body";

const validate = (schema: Partial<Record<SchemaKeys, Joi.Schema>>) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const keys = Object.keys(validSchema) as SchemaKeys[];
  const obj = keys.reduce(
    (acc, key) => {
      acc[key] = req[key];
      return acc;
    },
    {} as Record<string, unknown>
  );
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(obj);
  if (error) {
    const errorMessage = error.details.map((details: { message: string }) => details.message).join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
