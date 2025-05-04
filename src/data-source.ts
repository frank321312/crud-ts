import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { CustomNamingStrategy } from './namingStrategy/CustomNamingStrategy.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entitySkipConstructor: true,
    namingStrategy: new CustomNamingStrategy(),
    entities: [__dirname + '/entity/*.{js,ts}'],
    subscribers: [__dirname + '/subscriber/*.{js,ts}'],
    migrations: [],
    timezone: 'Z',
    extra: {
        connectionLimit: 10,
    },
});
