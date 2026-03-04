"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = exports.isRedisConnected = void 0;
const redis_1 = require("redis");
const logger_1 = __importDefault(require("../config/logger"));
exports.isRedisConnected = false;
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: (retries) => (retries > 3 ? new Error('Stop reconnecting') : 200),
    },
});
exports.redisClient.on('connect', () => {
    exports.isRedisConnected = true;
    logger_1.default.info('Connected to Redis');
});
exports.redisClient.on('error', (err) => {
    exports.isRedisConnected = false;
    logger_1.default.warn('Redis unavailable. Running without cache.');
});
const connectRedis = async () => {
    try {
        await exports.redisClient.connect();
    }
    catch (err) {
        logger_1.default.warn('Redis connection failed. Skipping cache layer.');
    }
};
exports.connectRedis = connectRedis;
//# sourceMappingURL=redis.js.map