import { Router } from "express";
import courseCompletionRoutes from "./course.completion.route";

const router = Router();

router.use("/course-completion", courseCompletionRoutes);

export default router;
