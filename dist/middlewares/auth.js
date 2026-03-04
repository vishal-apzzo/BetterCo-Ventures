"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const api_response_1 = __importDefault(require("../utils/api.response"));
const http_status_1 = __importDefault(require("http-status"));
const token_utils_1 = require("../utils/token.utils");
const services_1 = require("../services");
const client_1 = require("../client");
exports.SECRET_KEY = config_1.default.jwt.secret;
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        if (!decoded)
            throw new Error();
        req.token = decoded;
        req.userId = decoded.uid;
        req.access = decoded.access;
        req.roleType = decoded.roleType;
        req.storeId = decoded.storeId;
        req.type = decoded.type;
        const storeId = decoded.storeId;
        const userId = decoded.uid;
        const roleType = decoded.roleType;
        const type = decoded.type;
        if ((!req.originalUrl.includes('refresh-token') && type !== token_utils_1.tokenType.ACCESS) ||
            (req.originalUrl.includes('refresh-token') && type == token_utils_1.tokenType.ACCESS))
            return res.status(http_status_1.default.UNAUTHORIZED).send(api_response_1.default.unauthorizedError());
        if (roleType == token_utils_1.Role.CUSTOMER && !storeId)
            return res.status(http_status_1.default.UNAUTHORIZED).send(api_response_1.default.unauthorizedError());
        if (storeId && roleType == token_utils_1.Role.CUSTOMER) {
            const store = await services_1.storeService.getStoreById(storeId);
            if (!store || store.deleted)
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(api_response_1.default.errorMessage('Store not found'));
            if (store.isSubscriptionStopped)
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(api_response_1.default.errorMessage('Store subscription has been expired'));
        }
        let user;
        if (roleType == token_utils_1.Role.CUSTOMER) {
            user = await services_1.puCustomerService.getPuCustomerById(userId);
        }
        else if (roleType == token_utils_1.Role.STORE_OWNER || roleType == token_utils_1.Role.STORE_USER) {
            user = await services_1.storeUserService.getStoreUserById(userId);
        }
        else if (roleType == token_utils_1.Role.STORE_XPLORER) {
            user = await services_1.storeXplorerService.getStoreXplorerById(userId);
        }
        else if (roleType == token_utils_1.Role.RIDER) {
            user = await services_1.riderService.getRiderById(userId);
        }
        else {
            user = await services_1.pointerupAdminService.getPointerupAdminById(userId);
        }
        if (!user)
            return res
                .status(http_status_1.default.BAD_REQUEST)
                .send(api_response_1.default.errorMessage('User not found'));
        if (user.deleted ||
            user.status == client_1.UserStatusType.DELETED ||
            user.status == client_1.UserStatusType.IN_ACTIVE)
            return res
                .status(http_status_1.default.BAD_REQUEST)
                .send(api_response_1.default.errorMessage('User not active'));
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(http_status_1.default.UNAUTHORIZED).send(api_response_1.default.unauthorizedError());
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map