"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenType = exports.Role = exports.OrderTransactionType = exports.AccessPermission = void 0;
const config_1 = __importDefault(require("../config/config"));
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAccessToken = function (userId, permission, roleType, businessId) {
    const payload = {
        uid: userId,
        iat: (0, moment_1.default)().unix(),
        exp: (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, 'minutes').unix(),
        iss: 'PointerUp',
        aud: 'PointerUp Application',
        type: 'ACCESS',
        access: permission,
        roleType,
        storeId: businessId
    };
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret);
};
const getRefreshToken = function (userId, roleType, businessId) {
    const refreshTokenPayload = {
        uid: userId,
        iat: (0, moment_1.default)().unix(),
        exp: (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, 'days').unix(),
        iss: 'PointerUp',
        aud: 'PointerUp Application',
        type: 'REFRESH',
        roleType,
        storeId: businessId
    };
    return jsonwebtoken_1.default.sign(refreshTokenPayload, config_1.default.jwt.secret);
};
const generateAuthTokens = function (userId, permission, roleType, businessId) {
    return {
        accessToken: getAccessToken(userId, permission, roleType, businessId),
        refreshToken: getRefreshToken(userId, roleType, businessId)
    };
};
exports.default = {
    generateAuthTokens
};
var AccessPermission;
(function (AccessPermission) {
    AccessPermission["BASIC"] = "Basic";
    AccessPermission["ENHANCED"] = "Enforced";
})(AccessPermission || (exports.AccessPermission = AccessPermission = {}));
var OrderTransactionType;
(function (OrderTransactionType) {
    OrderTransactionType["SALES_RETURN"] = "SALES_RETURN";
    OrderTransactionType["SALES_ORDER"] = "SALES_ORDER";
    OrderTransactionType["TRANSFER_ORDER"] = "TRANSFER_ORDER";
})(OrderTransactionType || (exports.OrderTransactionType = OrderTransactionType = {}));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["BUSINESS_USER"] = "BUSINESS_USER";
    Role["STORE_OWNER"] = "STORE_OWNER";
    Role["CUSTOMER"] = "CUSTOMER";
    Role["STORE_USER"] = "STORE_USER";
    Role["STORE_MANAGER"] = "STORE_MANAGER";
    Role["STORE_XPLORER"] = "STORE_XPLORER";
    Role["RIDER"] = "RIDER";
})(Role || (exports.Role = Role = {}));
var tokenType;
(function (tokenType) {
    tokenType["ACCESS"] = "ACCESS";
    tokenType["REFRESH"] = "REFRESH";
})(tokenType || (exports.tokenType = tokenType = {}));
//# sourceMappingURL=token.utils.js.map