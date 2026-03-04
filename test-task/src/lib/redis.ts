import { createClient } from 'redis';
import logger from '../config/logger';

export let isRedisConnected = false;

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => (retries > 3 ? new Error('Stop reconnecting') : 200),
  },
});

redisClient.on('connect', () => {
  isRedisConnected = true;
  logger.info('Connected to Redis');
});

redisClient.on('error', (err) => {
  isRedisConnected = false;
  logger.warn('Redis unavailable. Running without cache.');
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    logger.warn('Redis connection failed. Skipping cache layer.');
  }
};
