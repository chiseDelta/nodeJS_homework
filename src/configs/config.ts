import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5200,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/beta",
};
