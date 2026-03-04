import { Router } from "express";
import validate from "../middlewares/validate";
import {
  createCourseCompletionValidation,
  updateCourseCompletionValidation,
  getCourseCompletionValidation,
  deleteCourseCompletionValidation,
  getCourseCompletionsValidation,
} from "./course.completion.validation";
import courseCompletionController from "./course.completion.controller";

const router = Router();

router.post("/create", validate(createCourseCompletionValidation), courseCompletionController.createCourseCompletion);
router.post("/", validate(getCourseCompletionsValidation), courseCompletionController.getCourseCompletions);
router.get(
  "/:courseCompletionId",
  validate(getCourseCompletionValidation),
  courseCompletionController.getCourseCompletion
);
router.patch(
  "/:courseCompletionId",
  validate(updateCourseCompletionValidation),
  courseCompletionController.updateCourseCompletion
);
router.delete(
  "/:courseCompletionId",
  validate(deleteCourseCompletionValidation),
  courseCompletionController.deleteCourseCompletion
);

export default router;
