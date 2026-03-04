"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const app_1 = require("./app");
const prisma_1 = require("./lib/prisma");
const redis_1 = require("./lib/redis");
const logger_1 = __importDefault(require("./config/logger"));
async function main() {
    let server;
    prisma_1.prisma.$connect()
        .then(async () => {
        logger_1.default.info('Connected to SQL Database');
        await (0, redis_1.connectRedis)();
        server = app_1.app.listen(config_1.config.port, () => {
            logger_1.default.info(`Server running on port ${config_1.config.port}`);
            logger_1.default.info(`Environment: ${config_1.config.nodeEnv}`);
        });
    })
        .catch((error) => {
        logger_1.default.error('Failed to connect to database:', error);
        logger_1.default.error('Application will exit. Check DATABASE_URL environment variable.');
        process.exit(1);
    });
    const shutdown = async () => {
        server.close(() => {
            redis_1.redisClient.disconnect().finally(() => process.exit(0));
        });
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
}
main().catch((err) => {
    logger_1.default.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map