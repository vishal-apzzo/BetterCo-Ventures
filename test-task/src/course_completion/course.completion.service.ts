import { PrismaClient, Prisma, CourseCompletion } from "@prisma/client";
import { prisma } from "../lib/prisma";

export type PrismaTx = PrismaClient | Prisma.TransactionClient;

const getClient = (tx?: PrismaTx) => (tx ?? prisma) as PrismaClient;

const createCourseCompletion = async <Key extends keyof CourseCompletion>(
  bodyParam: Prisma.CourseCompletionCreateInput,
  tx?: PrismaTx
): Promise<Pick<CourseCompletion, Key>> => {
  const record = await getClient(tx).courseCompletion.create({
    data: bodyParam,
  });
  return record as Pick<CourseCompletion, Key>;
};

const updateCourseCompletionById = async <Key extends keyof CourseCompletion>(
  id: string,
  updateBody: Prisma.CourseCompletionUpdateInput,
  tx?: PrismaTx
): Promise<Pick<CourseCompletion, Key>> => {
  const record = await getClient(tx).courseCompletion.update({
    where: { id },
    data: updateBody,
  });
  return record as Pick<CourseCompletion, Key>;
};

const getCourseCompletionById = async (
  id: string,
  _include?: object,
  tx?: PrismaTx
): Promise<CourseCompletion | null> => {
  return getClient(tx).courseCompletion.findUnique({
    where: { id },
  });
};

const getCourseCompletionByObj = async (
  filter: Prisma.CourseCompletionWhereInput,
  _include?: object,
  tx?: PrismaTx
): Promise<CourseCompletion | null> => {
  return getClient(tx).courseCompletion.findFirst({
    where: filter,
  });
};

const deleteCourseCompletionById = async <Key extends keyof CourseCompletion>(
  id: string,
  tx?: PrismaTx
): Promise<Pick<CourseCompletion, Key>> => {
  const record = await getClient(tx).courseCompletion.update({
    where: { id },
    data: { deleted: true },
  });
  return record as Pick<CourseCompletion, Key>;
};

const queryCourseCompletion = async (
  filter: Prisma.CourseCompletionWhereInput,
  options: {
    limit?: number;
    page?: number;
    sortBy?: keyof CourseCompletion;
    sortType?: "asc" | "desc";
  },
  _include?: object,
  tx?: PrismaTx
): Promise<CourseCompletion[]> => {
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

const queryCourseCompletionNoPagination = async (
  filter: Prisma.CourseCompletionWhereInput,
  tx?: PrismaTx
): Promise<CourseCompletion[]> => {
  return getClient(tx).courseCompletion.findMany({
    where: filter,
  });
};

const countCourseCompletion = async (
  filter: Prisma.CourseCompletionWhereInput,
  tx?: PrismaTx
): Promise<number> => {
  return getClient(tx).courseCompletion.count({
    where: filter,
  });
};

const createManyCourseCompletions = async (
  bodyParam: Prisma.CourseCompletionCreateManyInput[],
  tx?: PrismaTx
): Promise<Prisma.BatchPayload> => {
  return getClient(tx).courseCompletion.createMany({
    data: bodyParam,
  });
};

const updateManyCourseCompletions = async (
  where: Prisma.CourseCompletionWhereInput,
  updateBody: Prisma.CourseCompletionUpdateManyMutationInput,
  tx?: PrismaTx
): Promise<Prisma.BatchPayload> => {
  return getClient(tx).courseCompletion.updateMany({
    where,
    data: updateBody,
  });
};

export default {
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
