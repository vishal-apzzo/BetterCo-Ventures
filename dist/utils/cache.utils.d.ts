export declare const CACHE_VERSION = "v1";
export declare const hashObject: (obj: unknown) => string;
export declare const buildCacheKey: (prefix: string, payload?: unknown) => string;
export declare const getOrSetCache: <T>(key: string, cb: () => Promise<T>, ttl?: number) => Promise<T>;
export declare const setCache: (key: string, value: unknown, ttl?: number) => Promise<void>;
export declare const invalidateCache: (key: string) => Promise<void>;
export declare const invalidateCacheByPrefix: (prefix: string) => Promise<void>;
//# sourceMappingURL=cache.utils.d.ts.map