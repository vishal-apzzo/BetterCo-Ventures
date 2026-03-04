"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (object, keys) => {
    return keys.reduce((acc, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            acc[key] = object[key];
        }
        return acc;
    }, {});
};
exports.default = pick;
//# sourceMappingURL=pick.js.map