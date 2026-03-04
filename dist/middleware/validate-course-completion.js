"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCourseCompletionBody = validateCourseCompletionBody;
const REQUIRED_FIELDS = ["user_id", "course_id", "completion_status"];
function missingFields(body) {
    return REQUIRED_FIELDS.filter((field) => {
        const value = body[field];
        return value === undefined || value === null || (typeof value === "string" && value.trim() === "");
    });
}
function validateCourseCompletionBody(req, res, next) {
    const body = req.body;
    if (!body || typeof body !== "object") {
        res.status(400).json({
            success: false,
            error: {
                code: "INVALID_PAYLOAD",
                message: "Request body must be a valid JSON object.",
                details: [{ field: "body", message: "Missing or invalid JSON body." }],
            },
        });
        return;
    }
    const missing = missingFields(body);
    if (missing.length > 0) {
        const details = missing.map((field) => ({
            field,
            message: `Required field '${field}' is missing or empty.`,
        }));
        res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: `Missing required field(s): ${missing.join(", ")}.`,
                details,
            },
        });
        return;
    }
    next();
}
//# sourceMappingURL=validate-course-completion.js.map