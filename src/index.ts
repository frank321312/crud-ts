import { AppDataSource } from './data-source.js';

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });
