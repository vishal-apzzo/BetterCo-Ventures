import { NextFunction, Request, Response } from 'express';
/**
 * Clean for xss.
 * @param {string/object} data - The value to sanitize
 * @return {string/object} The sanitized value
 */
export declare const clean: <T>(data?: T | string) => T;
declare const middleware: () => (req: Request, res: Response, next: NextFunction) => void;
export default middleware;
//# sourceMappingURL=xss.d.ts.map