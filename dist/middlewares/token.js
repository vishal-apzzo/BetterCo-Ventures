"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenDecode = exports.userAuth = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const api_response_1 = __importDefault(require("../utils/api.response"));
const http_status_1 = __importDefault(require("http-status"));
const token_utils_1 = require("../utils/token.utils");
exports.SECRET_KEY = config_1.default.jwt.secret;
const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        req.token = decoded;
        const userId = decoded.uid;
        const access = decoded.access;
        const roleType = decoded.roleType;
        const type = decoded.type;
        const businessId = decoded.businessId;
        if ((!req.originalUrl.includes('refresh-token') && type !== token_utils_1.tokenType.ACCESS) ||
            (req.originalUrl.includes('refresh-token') && type == token_utils_1.tokenType.ACCESS))
            return res.status(http_status_1.default.UNAUTHORIZED).send(api_response_1.default.unauthorizedError());
        if (req.body.userId &&
            access == token_utils_1.AccessPermission.BASIC &&
            req.body.userId != userId &&
            req.body.businessId &&
            req.body.businessId != businessId) {
            return res.status(http_status_1.default.UNAUTHORIZED).send(api_response_1.default.noPermissionError());
        }
        // if (roleType !== Role.USER) {
        //     return res.status(httpStatus.UNAUTHORIZED).send(apiResponse.unauthorizedError());
        // }
        // const user = await userService.getUserById(userId);
        // if (user.businessId != businessId) {
        //     return res
        //         .status(httpStatus.BAD_REQUEST)
        //         .send(apiResponse.errorMessage('User not found'));
        // }
        // if (!user) {
        //     return res
        //         .status(httpStatus.BAD_REQUEST)
        //         .send(apiResponse.errorMessage('User not found'));
        // }
        // if (user.deleted) {
        //     return res
        //         .status(httpStatus.BAD_REQUEST)
        //         .send(apiResponse.errorMessage('This user has been deleted.'));
        // }
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(http_status_1.default.UNAUTHORIZED).send(api_response_1.default.unauthorizedError());
    }
};
exports.userAuth = userAuth;
const refreshTokenDecode = async (req) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        req.token = decoded;
        const userId = decoded.uid;
        const access = decoded.access;
        const roleType = decoded.roleType;
        const type = decoded.type;
        const businessId = decoded.storeId;
        const response = {
            userId,
            access,
            roleType,
            type,
            storeId: businessId
        };
        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.refreshTokenDecode = refreshTokenDecode;
//# sourceMappingURL=token.js.map