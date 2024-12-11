import { Kysely, PostgresDialect } from "kysely";
import { DatabaseSchema } from "./schema.js";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const db = new Kysely<DatabaseSchema>({
    dialect: new PostgresDialect({
        pool: new Pool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || "5432", 10),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false,
            },
        }),
    }),
});
