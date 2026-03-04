import Joi from "joi";

const paramsId = Joi.object({
  courseCompletionId: Joi.string().required().messages({
    "any.required": "courseCompletionId is required",
  }),
});

export const createCourseCompletionValidation = {
  body: Joi.object({
    user_id: Joi.string().required().trim().messages({
      "string.empty": "user_id is required",
      "any.required": "user_id is required",
    }),
    course_id: Joi.string().required().trim().messages({
      "string.empty": "course_id is required",
      "any.required": "course_id is required",
    }),
    completion_status: Joi.string().required().trim().messages({
      "string.empty": "completion_status is required",
      "any.required": "completion_status is required",
    }),
  }),
};

export const updateCourseCompletionValidation = {
  params: paramsId,
  body: Joi.object({
    user_id: Joi.string().trim().optional(),
    course_id: Joi.string().trim().optional(),
    completion_status: Joi.string().trim().optional(),
  })
    .min(1)
    .messages({ "object.min": "At least one field is required to update" }),
};

export const getCourseCompletionValidation = {
  params: paramsId,
};

export const deleteCourseCompletionValidation = {
  params: paramsId,
};

export const getCourseCompletionsValidation = {
  body: Joi.object({
    sortBy: Joi.string().optional(),
    sortType: Joi.string().valid("asc", "desc").optional(),
    limit: Joi.number().integer().min(1).optional(),
    page: Joi.number().integer().min(1).optional(),
    filter: Joi.object().optional(),
  }),
};
