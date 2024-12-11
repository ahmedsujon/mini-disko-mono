import * as dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || "4000",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || "5432",
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || "password",
    DB_NAME: process.env.DB_NAME || "postgres",
};
