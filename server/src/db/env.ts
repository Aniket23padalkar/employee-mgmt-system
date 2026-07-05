import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "PORT",
  "NODE_ENV",
  "DB_USERNAME",
  "DB_NAME",
  "DB_PORT",
  "DB_HOST",
  "DB_PASSWORD",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "ISSUER",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable ${key}`);
  }
});

export const config = {
  port: Number(process.env.PORT),
  node_env: process.env.NODE_ENV as string,
  db_username: process.env.DB_USERNAME as string,
  db_name: process.env.DB_NAME as string,
  db_port: Number(process.env.DB_PORT),
  db_host: process.env.DB_HOST as string,
  db_password: process.env.DB_PASSWORD as string,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as string,
  issuer: process.env.ISSUER as string,
};
