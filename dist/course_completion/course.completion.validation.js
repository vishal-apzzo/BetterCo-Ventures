"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseCompletionsValidation = exports.deleteCourseCompletionValidation = exports.getCourseCompletionValidation = exports.updateCourseCompletionValidation = exports.createCourseCompletionValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const paramsId = joi_1.default.object({
    courseCompletionId: joi_1.default.string().required().messages({
        "any.required": "courseCompletionId is required",
    }),
});
exports.createCourseCompletionValidation = {
    body: joi_1.default.object({
        user_id: joi_1.default.string().required().trim().messages({
            "string.empty": "user_id is required",
            "any.required": "user_id is required",
        }),
        course_id: joi_1.default.string().required().trim().messages({
            "string.empty": "course_id is required",
            "any.required": "course_id is required",
        }),
        completion_status: joi_1.default.string().required().trim().messages({
            "string.empty": "completion_status is required",
            "any.required": "completion_status is required",
        }),
    }),
};
exports.updateCourseCompletionValidation = {
    params: paramsId,
    body: joi_1.default.object({
        user_id: joi_1.default.string().trim().optional(),
        course_id: joi_1.default.string().trim().optional(),
        completion_status: joi_1.default.string().trim().optional(),
    })
        .min(1)
        .messages({ "object.min": "At least one field is required to update" }),
};
exports.getCourseCompletionValidation = {
    params: paramsId,
};
exports.deleteCourseCompletionValidation = {
    params: paramsId,
};
exports.getCourseCompletionsValidation = {
    body: joi_1.default.object({
        sortBy: joi_1.default.string().optional(),
        sortType: joi_1.default.string().valid("asc", "desc").optional(),
        limit: joi_1.default.number().integer().min(1).optional(),
        page: joi_1.default.number().integer().min(1).optional(),
        filter: joi_1.default.object().optional(),
    }),
};
//# sourceMappingURL=course.completion.validation.js.map