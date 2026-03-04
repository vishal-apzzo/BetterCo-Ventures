"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const getClient = (tx) => (tx ?? prisma_1.prisma);
const createCourseCompletion = async (bodyParam, tx) => {
    const record = await getClient(tx).courseCompletion.create({
        data: bodyParam,
    });
    return record;
};
const updateCourseCompletionById = async (id, updateBody, tx) => {
    const record = await getClient(tx).courseCompletion.update({
        where: { id },
        data: updateBody,
    });
    return record;
};
const getCourseCompletionById = async (id, _include, tx) => {
    return getClient(tx).courseCompletion.findUnique({
        where: { id },
    });
};
const getCourseCompletionByObj = async (filter, _include, tx) => {
    return getClient(tx).courseCompletion.findFirst({
        where: filter,
    });
};
const deleteCourseCompletionById = async (id, tx) => {
    const record = await getClient(tx).courseCompletion.update({
        where: { id },
        data: { deleted: true },
    });
    return record;
};
const queryCourseCompletion = async (filter, options, _include, tx) => {
    const page = (options.page ?? 1) - 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? "desc";
    const records = await getClient(tx).courseCompletion.findMany({
        where: filter,
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
    });
    return records;
};
const queryCourseCompletionNoPagination = async (filter, tx) => {
    return getClient(tx).courseCompletion.findMany({
        where: filter,
    });
};
const countCourseCompletion = async (filter, tx) => {
    return getClient(tx).courseCompletion.count({
        where: filter,
    });
};
const createManyCourseCompletions = async (bodyParam, tx) => {
    return getClient(tx).courseCompletion.createMany({
        data: bodyParam,
    });
};
const updateManyCourseCompletions = async (where, updateBody, tx) => {
    return getClient(tx).courseCompletion.updateMany({
        where,
        data: updateBody,
    });
};
exports.default = {
    createCourseCompletion,
    getCourseCompletionById,
    getCourseCompletionByObj,
    deleteCourseCompletionById,
    updateCourseCompletionById,
    queryCourseCompletion,
    queryCourseCompletionNoPagination,
    countCourseCompletion,
    createManyCourseCompletions,
    updateManyCourseCompletions,
};
//# sourceMappingURL=course.completion.service.js.map