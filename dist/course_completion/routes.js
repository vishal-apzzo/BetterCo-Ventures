"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../middlewares/validate"));
const validation_1 = require("./validation");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.default)(validation_1.courseCompletionValidation), controller_1.submitCourseCompletion);
exports.default = router;
//# sourceMappingURL=routes.js.map