import { DataSource } from 'typeorm';
import { CustomNamingStrategy } from './namingStrategy/CustomNamingStrategy.js';
import { fileURLToPath } from 'url';
import path from 'path';
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USERNAME,
} from './utils/Enviroment.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    entitySkipConstructor: true,
    namingStrategy: new CustomNamingStrategy(),
    entities: [__dirname + '/entity/*.{js,ts}'],
    migrations: [__dirname + '/migrations/*.ts'],
    timezone: 'Z',
    extra: {
        connectionLimit: 10,
    },
});
