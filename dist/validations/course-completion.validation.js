"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseCompletionValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.courseCompletionValidation = {
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
//# sourceMappingURL=course-completion.validation.js.map