import httpStatus from 'http-status';

const successResponse = function () {
    return { code: httpStatus.OK, message: 'success' };
};

const successResponseWithData = function (data: any, count?:any) {
    return { code: httpStatus.OK, message: 'success', data, count };
};

const unauthorizedError = function () {
    return { code: httpStatus.UNAUTHORIZED, message: 'unauthorized' };
};

const noPermissionError = function () {
    return {
        code: httpStatus.UNAUTHORIZED,
        message: 'You are not authorized to perform this operation'
    };
};

const errorMessage = function (message: string) {
    return { code: httpStatus.BAD_REQUEST, message };
};

const errorMessageWithData = function (message: string, data: any) {
    return { code: httpStatus.BAD_REQUEST, message, data };
};

const notFoundError = function (message: string) {
    return { code: httpStatus.NOT_FOUND, message };
};

export default {
    successResponse,
    unauthorizedError,
    noPermissionError,
    errorMessage,
    successResponseWithData,
    errorMessageWithData,
    notFoundError
};
