"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitCourseCompletion = void 0;
const redis_1 = require("../lib/redis");
const service_1 = __importDefault(require("./service"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const api_response_1 = __importDefault(require("../utils/api.response"));
const http_status_1 = __importDefault(require("http-status"));
exports.submitCourseCompletion = (0, catchAsync_1.default)(async (req, res) => {
    const { user_id, course_id, completion_status } = req.body;
    const timestamp = new Date().toISOString();
    const record = await service_1.default.createCourseCompletion({
        userId: user_id,
        courseId: course_id,
        completionStatus: completion_status,
    });
    const redis = (0, redis_1.getRedis)();
    await redis
        .setex(`completion:${record.id}`, 3600, JSON.stringify({ user_id, course_id, completion_status, timestamp }))
        .catch(() => { });
    res.status(http_status_1.default.CREATED).send({
        ...api_response_1.default.successResponseWithData({ timestamp, id: record.id }),
        success: true,
        timestamp,
        id: record.id,
    });
});
//# sourceMappingURL=controller.js.map