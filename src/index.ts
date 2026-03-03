import { config } from "./config/config";
import { app } from "./app";
import { prisma } from "./lib/prisma";
import { connectRedis, redisClient } from "./lib/redis";
import logger from "./config/logger";
import { Server } from "http";

async function main(): Promise<void> {
  let server: Server;
  prisma.$connect()
    .then(async () => {
        logger.info('Connected to SQL Database');
        await connectRedis();
        server = app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port}`);
            logger.info(`Environment: ${config.nodeEnv}`);
        });
    })
    .catch((error) => {
        logger.error('Failed to connect to database:', error);
        logger.error('Application will exit. Check DATABASE_URL environment variable.');
        process.exit(1);
    });

  const shutdown = async (): Promise<void> => {
    server.close(() => {
      redisClient.disconnect().finally(() => process.exit(0));
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
