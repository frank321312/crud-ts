import dotenv from 'dotenv';

dotenv.config();

export const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET_KEY,
    NODE_ENV,
} = process.env;
