import { Request, Response, NextFunction, RequestHandler } from "express";
declare const catchAsync: (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map