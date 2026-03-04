"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pick_1 = __importDefault(require("../utils/pick"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const course_completion_service_1 = __importDefault(require("./course.completion.service"));
const api_response_1 = __importDefault(require("../utils/api.response"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const cache_utils_1 = require("../utils/cache.utils");
const CACHE_PREFIX_ONE = "course-completion";
const LIST_PREFIX = "course-completions";
const CACHE_TTL = 300;
const createCourseCompletion = (0, catchAsync_1.default)(async (req, res) => {
    const { user_id, course_id, completion_status } = req.body;
    const timestamp = new Date().toISOString();
    const record = await course_completion_service_1.default.createCourseCompletion({
        userId: user_id,
        courseId: course_id,
        completionStatus: completion_status,
    });
    // Invalidate list cache (non-blocking)
    (0, cache_utils_1.invalidateCacheByPrefix)(`${cache_utils_1.CACHE_VERSION}:${LIST_PREFIX}`).catch((err) => {
        console.error("[courseCompletion] Failed to invalidate list cache:", err);
    });
    res.send(api_response_1.default.successResponseWithData({ ...record, timestamp }));
});
const updateCourseCompletion = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.courseCompletionId;
    const check = await course_completion_service_1.default.getCourseCompletionById(id);
    if (!check) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course completion not found");
    }
    if (check.deleted) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This course completion has been deleted.");
    }
    const updateBody = {};
    if (req.body.user_id !== undefined)
        updateBody.userId = req.body.user_id;
    if (req.body.course_id !== undefined)
        updateBody.courseId = req.body.course_id;
    if (req.body.completion_status !== undefined)
        updateBody.completionStatus = req.body.completion_status;
    const record = await course_completion_service_1.default.updateCourseCompletionById(id, updateBody);
    // Invalidate list cache (non-blocking)
    (0, cache_utils_1.invalidateCacheByPrefix)(`${cache_utils_1.CACHE_VERSION}:${LIST_PREFIX}`).catch((err) => {
        console.error("[courseCompletion] Failed to invalidate list cache:", err);
    });
    res.send(api_response_1.default.successResponseWithData(record));
});
const getCourseCompletion = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.courseCompletionId;
    const record = await course_completion_service_1.default.getCourseCompletionById(id);
    if (!record) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course completion not found");
    }
    res.send(api_response_1.default.successResponseWithData(record));
});
const deleteCourseCompletion = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.courseCompletionId;
    const check = await course_completion_service_1.default.getCourseCompletionById(id);
    if (!check) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course completion not found");
    }
    const record = await course_completion_service_1.default.deleteCourseCompletionById(id);
    // Invalidate list cache (non-blocking)
    (0, cache_utils_1.invalidateCacheByPrefix)(`${cache_utils_1.CACHE_VERSION}:${LIST_PREFIX}`).catch((err) => {
        console.error("[courseCompletion] Failed to invalidate list cache:", err);
    });
    res.send(api_response_1.default.successResponseWithData(record));
});
const getCourseCompletions = (0, catchAsync_1.default)(async (req, res) => {
    const options = (0, pick_1.default)(req.body, ["sortType", "sortBy", "limit", "page"]);
    const filter = req.body.filter || {};
    const opts = {
        ...options,
        limit: options.limit != null ? Number(options.limit) : undefined,
        page: options.page != null ? Number(options.page) : undefined,
        sortBy: options.sortBy,
        sortType: options.sortType || "desc",
    };
    const cacheKey = (0, cache_utils_1.buildCacheKey)(LIST_PREFIX, req.body);
    const result = await (0, cache_utils_1.getOrSetCache)(cacheKey, async () => {
        const list = await course_completion_service_1.default.queryCourseCompletion(filter, opts);
        const overallCount = await course_completion_service_1.default.countCourseCompletion(filter);
        return { list, overallCount };
    }, CACHE_TTL);
    res.send(api_response_1.default.successResponseWithData(result.list, result.overallCount));
});
exports.default = {
    createCourseCompletion,
    updateCourseCompletion,
    getCourseCompletion,
    getCourseCompletions,
    deleteCourseCompletion,
};
//# sourceMappingURL=course.completion.controller.js.map