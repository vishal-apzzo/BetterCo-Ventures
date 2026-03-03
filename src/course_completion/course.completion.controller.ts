import { Request, Response } from "express";
import pick from "../utils/pick";
import catchAsync from "../utils/catchAsync";
import courseCompletionService from "./course.completion.service";
import apiResponse from "../utils/api.response";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import {
  getOrSetCache,
  buildCacheKey,
  invalidateCacheByPrefix,
  CACHE_VERSION,
} from "../utils/cache.utils";

const CACHE_PREFIX_ONE = "course-completion";
const LIST_PREFIX = "course-completions";
const CACHE_TTL = 300;

const createCourseCompletion = catchAsync(async (req: Request, res: Response) => {
  const { user_id, course_id, completion_status } = req.body;
  const timestamp = new Date().toISOString();

  const record = await courseCompletionService.createCourseCompletion({
    userId: user_id,
    courseId: course_id,
    completionStatus: completion_status,
  });

  // Invalidate list cache (non-blocking)
  invalidateCacheByPrefix(`${CACHE_VERSION}:${LIST_PREFIX}`).catch((err) => {
    console.error("[courseCompletion] Failed to invalidate list cache:", err);
  });

  res.send(apiResponse.successResponseWithData({ ...record, timestamp }));
});

const updateCourseCompletion = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.courseCompletionId;
  const check = await courseCompletionService.getCourseCompletionById(id);
  if (!check) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course completion not found");
  }
  if (check.deleted) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This course completion has been deleted.");
  }

  const updateBody: Record<string, string> = {};
  if (req.body.user_id !== undefined) updateBody.userId = req.body.user_id;
  if (req.body.course_id !== undefined) updateBody.courseId = req.body.course_id;
  if (req.body.completion_status !== undefined) updateBody.completionStatus = req.body.completion_status;

  const record = await courseCompletionService.updateCourseCompletionById(id, updateBody);

  // Invalidate list cache (non-blocking)
  invalidateCacheByPrefix(`${CACHE_VERSION}:${LIST_PREFIX}`).catch((err) => {
    console.error("[courseCompletion] Failed to invalidate list cache:", err);
  });

  res.send(apiResponse.successResponseWithData(record));
});

const getCourseCompletion = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.courseCompletionId;
  const record = await courseCompletionService.getCourseCompletionById(id);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course completion not found");
  }
  res.send(apiResponse.successResponseWithData(record));
});

const deleteCourseCompletion = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.courseCompletionId;
  const check = await courseCompletionService.getCourseCompletionById(id);
  if (!check) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course completion not found");
  }
  const record = await courseCompletionService.deleteCourseCompletionById(id);

  // Invalidate list cache (non-blocking)
  invalidateCacheByPrefix(`${CACHE_VERSION}:${LIST_PREFIX}`).catch((err) => {
    console.error("[courseCompletion] Failed to invalidate list cache:", err);
  });

  res.send(apiResponse.successResponseWithData(record));
});

const getCourseCompletions = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.body, ["sortType", "sortBy", "limit", "page"]);
  const filter = req.body.filter || {};
  const opts = {
    ...options,
    limit: options.limit != null ? Number(options.limit) : undefined,
    page: options.page != null ? Number(options.page) : undefined,
    sortBy: options.sortBy as keyof import("../generated/prisma/client").CourseCompletion | undefined,
    sortType: (options.sortType as "asc" | "desc") || "desc",
  };
  const cacheKey = buildCacheKey(LIST_PREFIX, req.body);

  const result = await getOrSetCache(
    cacheKey,
    async () => {
      const list = await courseCompletionService.queryCourseCompletion(filter, opts);
      const overallCount = await courseCompletionService.countCourseCompletion(filter);
      return { list, overallCount };
    },
    CACHE_TTL
  );

  res.send(apiResponse.successResponseWithData(result.list, result.overallCount));
});

export default {
  createCourseCompletion,
  updateCourseCompletion,
  getCourseCompletion,
  getCourseCompletions,
  deleteCourseCompletion,
};
