import { AppDataSource } from '../data-source.js';
import { Usuario } from '../entity/Usuario.js';
import { faker } from '@faker-js/faker';
import { encryptString } from '../utils/bcrypt.util.js';

export async function insertarUsuario() {
    for (let i = 0; i < 50; i++) {
        await AppDataSource.manager.save(
            new Usuario(
                faker.internet.username(),
                faker.person.firstName(),
                faker.person.lastName(),
                faker.internet.email(),
                await encryptString(faker.internet.password()),
            ),
        );
    }
}
