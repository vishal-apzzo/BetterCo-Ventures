import crypto from "crypto";
import { redisClient } from "../lib/redis";
import logger from "../config/logger";

export const CACHE_VERSION = "v1";

export const hashObject = (obj: unknown): string => {
    const str = JSON.stringify(obj);
    return crypto.createHash("sha256").update(str).digest("hex").slice(0, 16);
};

export const buildCacheKey = (prefix: string, payload?: unknown): string => {
    const base = `${CACHE_VERSION}:${prefix}`;
    if (!payload) return base;
    return `${base}:${hashObject(payload)}`;
};

export const getOrSetCache = async <T>(key: string, cb: () => Promise<T>, ttl = 300): Promise<T> => {
    try {
        if (!redisClient.isReady) return await cb();

        const cached = await redisClient.get(key);
        if (cached) {
            logger.info(`[CACHE HIT] ${key}`);
            return JSON.parse(cached) as T;
        }

        logger.info(`[CACHE MISS] ${key}`);
        const freshData = await cb();
        await redisClient.setEx(key, ttl, JSON.stringify(freshData));
        return freshData;
    } catch (err) {
        logger.error(`[CACHE ERROR] ${key} - ${(err as Error).message}`);
        return await cb();
    }
};

export const setCache = async (key: string, value: unknown, ttl = 300): Promise<void> => {
    try {
        if (!redisClient.isReady) return;
        await redisClient.setEx(key, ttl, JSON.stringify(value));
        logger.info(`[CACHE SET] ${key}`);
    } catch (err) {
        logger.error(`[CACHE SET ERROR] ${key} - ${(err as Error).message}`);
    }
};

export const invalidateCache = async (key: string): Promise<void> => {
    try {
        if (!redisClient.isReady) return;
        await redisClient.del(key);
        logger.info(`[CACHE INVALIDATED] ${key}`);
    } catch (err) {
        logger.error(`[CACHE INVALIDATION ERROR] ${key} - ${(err as Error).message}`);
    }
};

export const invalidateCacheByPrefix = async (prefix: string): Promise<void> => {
    try {
        if (!redisClient.isReady) return;

        let cursor: string = '0';
        let deletedCount = 0;

        do {
            const result = await redisClient.scan(cursor, { MATCH: `${prefix}*`, COUNT: 100 });
            cursor = String(result.cursor);
            if (result.keys.length > 0) {
                await redisClient.del(result.keys);
                deletedCount += result.keys.length;
            }
        } while (cursor !== '0');

        if (deletedCount > 0) {
            logger.info(`[CACHE INVALIDATED] ${prefix}* (${deletedCount} keys)`);
        } else {
            logger.info(`[CACHE NOT FOUND] ${prefix}*`);
        }
    } catch (err) {
        logger.error(`[CACHE PREFIX INVALIDATION ERROR] ${prefix}* - ${(err as Error).message}`);
    }
};
