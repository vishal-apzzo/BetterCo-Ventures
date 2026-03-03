import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT ?? "3000", 10),
  nodeEnv: process.env.NODE_ENV ?? "development",
  redis: {
    url: process.env.REDIS_URL,
  },
} as const;

export default {
  env: config.nodeEnv,
};
