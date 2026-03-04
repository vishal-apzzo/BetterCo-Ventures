"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.perSecondLimit = exports.authLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_1 = __importDefault(require("http-status"));
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 3,
    skipSuccessfulRequests: false,
    keyGenerator: (req) => {
        return req.body.email || req.ip;
    },
    message: {
        code: http_status_1.default.TOO_MANY_REQUESTS,
        message: 'Reached sending otp limit please try after 10 minutes.'
    }
});
exports.perSecondLimit = (0, express_rate_limit_1.default)({
    windowMs: 1000,
    max: 1,
    skipSuccessfulRequests: false,
    message: {
        code: http_status_1.default.TOO_MANY_REQUESTS,
        message: 'Too many requests from you ip please try again later.'
    }
});
//# sourceMappingURL=rateLimiter.js.map