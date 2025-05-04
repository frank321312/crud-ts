import { AppDataSource } from '../data-source.js';
import { Usuario } from '../entity/Usuario.js';

export async function insertarUsuario() {
    const usuarios: Usuario[] = [
        new Usuario('Carlos García', 'carlos.garcia@example.com', 'mypassword'),
        new Usuario('Juan Pérez', 'juan.perez@example.com', 'password123'),
        new Usuario('María López', 'maria.lopez@example.com', 'securepass'),
        new Usuario('Ana Fernández', 'ana.fernandez@example.com', 'adminpass'),
        new Usuario('Luis Martínez', 'luis.martinez@example.com', 'userpass'),
    ];

    for (const usuario of usuarios) {
        await AppDataSource.manager.save(usuario);
    }
}
