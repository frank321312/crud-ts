import { AppDataSource } from './data-source.js';
import { Usuario } from './entity/Usuario.js';
import { UsuarioProyecto } from './entity/UsuarioProyecto.js';
import { insertarProyecto } from './insert/InsertarProyecto.js';
import { insertarUsuario } from './insert/InsertarUsuario.js';
import { crearProyecto } from './utils/usuario.util.js';

AppDataSource.initialize()
    .then(async () => {
        console.log('Database connected');

        const existeUsuario = await AppDataSource.getRepository(
            Usuario,
        ).existsBy({ id: 1 });

        if (!existeUsuario) {
            await insertarUsuario();
            await insertarProyecto();
            await crearProyecto(1, 'milanesa');
        }

        const data = await AppDataSource.getRepository(UsuarioProyecto).find({
            select: {
                id: true,
                usuario: { id: true, correoElectronico: true },
            },
            relations: {
                usuario: true,
            },
        });

        console.log(data);
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });
