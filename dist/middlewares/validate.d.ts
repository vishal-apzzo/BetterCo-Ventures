import { NextFunction, Request, Response } from "express";
import Joi from "joi";
type SchemaKeys = "params" | "query" | "body";
declare const validate: (schema: Partial<Record<SchemaKeys, Joi.Schema>>) => (req: Request, res: Response, next: NextFunction) => void;
export default validate;
//# sourceMappingURL=validate.d.ts.map