"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseCompletionRoutes = void 0;
const express_1 = require("express");
const validate_1 = __importDefault(require("../middlewares/validate"));
const course_completion_validation_1 = require("../validations/course-completion.validation");
const course_completion_controller_1 = require("../controllers/course-completion.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.default)(course_completion_validation_1.courseCompletionValidation), course_completion_controller_1.submitCourseCompletion);
exports.courseCompletionRoutes = router;
//# sourceMappingURL=course-completion.routes.js.map