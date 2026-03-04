import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Role, tokenType } from '../utils/token.utils';
export declare const SECRET_KEY: Secret;
export interface CustomRequest extends Request {
    token: string | JwtPayload;
    userId: string;
    access: string;
    roleType: Role;
    storeId: string | undefined;
    type: tokenType;
}
export interface UserIDJwtPayload extends jwt.JwtPayload {
    uid: string;
    access: string;
    storeId: string | undefined;
    roleType: Role;
    type: tokenType;
}
export declare const auth: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.d.ts.map