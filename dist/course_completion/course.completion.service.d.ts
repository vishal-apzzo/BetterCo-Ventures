import { PrismaClient, Prisma, CourseCompletion } from "../generated/prisma/client";
export type PrismaTx = PrismaClient | Prisma.TransactionClient;
declare const _default: {
    createCourseCompletion: <Key extends keyof CourseCompletion>(bodyParam: Prisma.CourseCompletionCreateInput, tx?: PrismaTx) => Promise<Pick<CourseCompletion, Key>>;
    getCourseCompletionById: (id: string, _include?: object, tx?: PrismaTx) => Promise<CourseCompletion | null>;
    getCourseCompletionByObj: (filter: Prisma.CourseCompletionWhereInput, _include?: object, tx?: PrismaTx) => Promise<CourseCompletion | null>;
    deleteCourseCompletionById: <Key extends keyof CourseCompletion>(id: string, tx?: PrismaTx) => Promise<Pick<CourseCompletion, Key>>;
    updateCourseCompletionById: <Key extends keyof CourseCompletion>(id: string, updateBody: Prisma.CourseCompletionUpdateInput, tx?: PrismaTx) => Promise<Pick<CourseCompletion, Key>>;
    queryCourseCompletion: (filter: Prisma.CourseCompletionWhereInput, options: {
        limit?: number;
        page?: number;
        sortBy?: keyof CourseCompletion;
        sortType?: "asc" | "desc";
    }, _include?: object, tx?: PrismaTx) => Promise<CourseCompletion[]>;
    queryCourseCompletionNoPagination: (filter: Prisma.CourseCompletionWhereInput, tx?: PrismaTx) => Promise<CourseCompletion[]>;
    countCourseCompletion: (filter: Prisma.CourseCompletionWhereInput, tx?: PrismaTx) => Promise<number>;
    createManyCourseCompletions: (bodyParam: Prisma.CourseCompletionCreateManyInput[], tx?: PrismaTx) => Promise<Prisma.BatchPayload>;
    updateManyCourseCompletions: (where: Prisma.CourseCompletionWhereInput, updateBody: Prisma.CourseCompletionUpdateManyMutationInput, tx?: PrismaTx) => Promise<Prisma.BatchPayload>;
};
export default _default;
//# sourceMappingURL=course.completion.service.d.ts.map