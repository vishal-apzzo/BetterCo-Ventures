"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const successResponse = function () {
    return { code: http_status_1.default.OK, message: 'success' };
};
const successResponseWithData = function (data, count) {
    return { code: http_status_1.default.OK, message: 'success', data, count };
};
const unauthorizedError = function () {
    return { code: http_status_1.default.UNAUTHORIZED, message: 'unauthorized' };
};
const noPermissionError = function () {
    return {
        code: http_status_1.default.UNAUTHORIZED,
        message: 'You are not authorized to perform this operation'
    };
};
const errorMessage = function (message) {
    return { code: http_status_1.default.BAD_REQUEST, message };
};
const errorMessageWithData = function (message, data) {
    return { code: http_status_1.default.BAD_REQUEST, message, data };
};
const notFoundError = function (message) {
    return { code: http_status_1.default.NOT_FOUND, message };
};
exports.default = {
    successResponse,
    unauthorizedError,
    noPermissionError,
    errorMessage,
    successResponseWithData,
    errorMessageWithData,
    notFoundError
};
//# sourceMappingURL=api.response.js.map