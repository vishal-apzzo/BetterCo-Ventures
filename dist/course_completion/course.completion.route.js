"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../middlewares/validate"));
const course_completion_validation_1 = require("./course.completion.validation");
const course_completion_controller_1 = __importDefault(require("./course.completion.controller"));
const router = (0, express_1.Router)();
router.post("/create", (0, validate_1.default)(course_completion_validation_1.createCourseCompletionValidation), course_completion_controller_1.default.createCourseCompletion);
router.post("/", (0, validate_1.default)(course_completion_validation_1.getCourseCompletionsValidation), course_completion_controller_1.default.getCourseCompletions);
router.get("/:courseCompletionId", (0, validate_1.default)(course_completion_validation_1.getCourseCompletionValidation), course_completion_controller_1.default.getCourseCompletion);
router.patch("/:courseCompletionId", (0, validate_1.default)(course_completion_validation_1.updateCourseCompletionValidation), course_completion_controller_1.default.updateCourseCompletion);
router.delete("/:courseCompletionId", (0, validate_1.default)(course_completion_validation_1.deleteCourseCompletionValidation), course_completion_controller_1.default.deleteCourseCompletion);
exports.default = router;
//# sourceMappingURL=course.completion.route.js.map