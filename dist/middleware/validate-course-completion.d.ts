import { Request, Response, NextFunction } from "express";
import { CourseCompletionPayload, ValidationErrorResponse } from "../types/course-completion";
export declare function validateCourseCompletionBody(req: Request<object, object, CourseCompletionPayload>, res: Response<ValidationErrorResponse>, next: NextFunction): void;
//# sourceMappingURL=validate-course-completion.d.ts.map