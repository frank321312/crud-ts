import { faker } from '@faker-js/faker';
import { rolService } from '../services/RolService.js';

export async function insertarRol() {
    for (let i = 1; i <= 5; i++) {
        for (let x = 0; x < 5; x++) {
            await rolService.crear(faker.person.jobType(), i);
        }
    }
}
