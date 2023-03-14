import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5200,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/beta",

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "JWT_ACCESS_SECRET",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "JWT_REFRESH_SECRET",
};
