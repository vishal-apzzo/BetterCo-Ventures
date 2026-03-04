"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const course_completion_1 = __importDefault(require("./course_completion"));
const error_1 = require("./middlewares/error");
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const morgan_1 = __importDefault(require("./config/morgan"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(morgan_1.default.successHandler);
app.use(morgan_1.default.errorHandler);
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use("/api", course_completion_1.default);
app.use((_req, _res, next) => {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, "Resource not found."));
});
app.use(error_1.errorConverter);
app.use(error_1.errorHandler);
//# sourceMappingURL=app.js.map