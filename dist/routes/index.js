"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const course_completion_routes_1 = require("./course-completion.routes");
const apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
apiRouter.use("/course-completion", course_completion_routes_1.courseCompletionRoutes);
//# sourceMappingURL=index.js.map