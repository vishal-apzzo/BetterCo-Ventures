import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../utils/token.utils';
export declare const SECRET_KEY: Secret;
export interface CustomRequest extends Request {
    token: string | JwtPayload;
    userId: string;
    access: string;
    role: Role;
    type: string;
    businessId: string;
    businessUserId: string;
}
export interface UserIDJwtPayload extends jwt.JwtPayload {
    uid: string;
    access: string;
}
export declare const userAuth: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const refreshTokenDecode: (req: Request) => Promise<unknown>;
//# sourceMappingURL=token.d.ts.map