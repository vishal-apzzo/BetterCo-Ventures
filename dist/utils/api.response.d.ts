declare const _default: {
    successResponse: () => {
        code: 200;
        message: string;
    };
    unauthorizedError: () => {
        code: 401;
        message: string;
    };
    noPermissionError: () => {
        code: 401;
        message: string;
    };
    errorMessage: (message: string) => {
        code: 400;
        message: string;
    };
    successResponseWithData: (data: any, count?: any) => {
        code: 200;
        message: string;
        data: any;
        count: any;
    };
    errorMessageWithData: (message: string, data: any) => {
        code: 400;
        message: string;
        data: any;
    };
    notFoundError: (message: string) => {
        code: 404;
        message: string;
    };
};
export default _default;
//# sourceMappingURL=api.response.d.ts.map