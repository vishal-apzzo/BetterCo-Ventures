export interface CourseCompletionPayload {
    user_id: string;
    course_id: string;
    completion_status: string;
}
export interface CourseCompletionSuccessResponse {
    success: true;
    timestamp: string;
    id?: string;
}
export interface ValidationErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: {
            field: string;
            message: string;
        }[];
    };
}
//# sourceMappingURL=course-completion.d.ts.map