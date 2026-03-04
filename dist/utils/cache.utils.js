"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCacheByPrefix = exports.invalidateCache = exports.setCache = exports.getOrSetCache = exports.buildCacheKey = exports.hashObject = exports.CACHE_VERSION = void 0;
const crypto_1 = __importDefault(require("crypto"));
const redis_1 = require("../lib/redis");
const logger_1 = __importDefault(require("../config/logger"));
exports.CACHE_VERSION = "v1";
const hashObject = (obj) => {
    const str = JSON.stringify(obj);
    return crypto_1.default.createHash("sha256").update(str).digest("hex").slice(0, 16);
};
exports.hashObject = hashObject;
const buildCacheKey = (prefix, payload) => {
    const base = `${exports.CACHE_VERSION}:${prefix}`;
    if (!payload)
        return base;
    return `${base}:${(0, exports.hashObject)(payload)}`;
};
exports.buildCacheKey = buildCacheKey;
const getOrSetCache = async (key, cb, ttl = 300) => {
    try {
        if (!redis_1.redisClient.isReady)
            return await cb();
        const cached = await redis_1.redisClient.get(key);
        if (cached) {
            logger_1.default.info(`[CACHE HIT] ${key}`);
            return JSON.parse(cached);
        }
        logger_1.default.info(`[CACHE MISS] ${key}`);
        const freshData = await cb();
        await redis_1.redisClient.setEx(key, ttl, JSON.stringify(freshData));
        return freshData;
    }
    catch (err) {
        logger_1.default.error(`[CACHE ERROR] ${key} - ${err.message}`);
        return await cb();
    }
};
exports.getOrSetCache = getOrSetCache;
const setCache = async (key, value, ttl = 300) => {
    try {
        if (!redis_1.redisClient.isReady)
            return;
        await redis_1.redisClient.setEx(key, ttl, JSON.stringify(value));
        logger_1.default.info(`[CACHE SET] ${key}`);
    }
    catch (err) {
        logger_1.default.error(`[CACHE SET ERROR] ${key} - ${err.message}`);
    }
};
exports.setCache = setCache;
const invalidateCache = async (key) => {
    try {
        if (!redis_1.redisClient.isReady)
            return;
        await redis_1.redisClient.del(key);
        logger_1.default.info(`[CACHE INVALIDATED] ${key}`);
    }
    catch (err) {
        logger_1.default.error(`[CACHE INVALIDATION ERROR] ${key} - ${err.message}`);
    }
};
exports.invalidateCache = invalidateCache;
const invalidateCacheByPrefix = async (prefix) => {
    try {
        if (!redis_1.redisClient.isReady)
            return;
        let cursor = '0';
        let deletedCount = 0;
        do {
            const result = await redis_1.redisClient.scan(cursor, { MATCH: `${prefix}*`, COUNT: 100 });
            cursor = String(result.cursor);
            if (result.keys.length > 0) {
                await redis_1.redisClient.del(result.keys);
                deletedCount += result.keys.length;
            }
        } while (cursor !== '0');
        if (deletedCount > 0) {
            logger_1.default.info(`[CACHE INVALIDATED] ${prefix}* (${deletedCount} keys)`);
        }
        else {
            logger_1.default.info(`[CACHE NOT FOUND] ${prefix}*`);
        }
    }
    catch (err) {
        logger_1.default.error(`[CACHE PREFIX INVALIDATION ERROR] ${prefix}* - ${err.message}`);
    }
};
exports.invalidateCacheByPrefix = invalidateCacheByPrefix;
//# sourceMappingURL=cache.utils.js.map