import { AppDataSource } from '../data-source.js';
import { Usuario } from '../entity/Usuario.js';
import { Proyecto } from '../entity/Proyecto.js';
import { obtenerDatos } from './util.js';
import { Rol, UsuarioProyecto } from '../entity/index.js';

export const agregarUsuario = async (
    idUsuario: number,
    idProyecto: number,
    rol: Rol,
) => {
    const obtenerUsuario = await obtenerDatos(Usuario, { id: idUsuario });
    const obtenerProyecto = await obtenerDatos(Proyecto, { id: idProyecto });
    const usuarioProyecto = new UsuarioProyecto(
        obtenerUsuario,
        obtenerProyecto,
        rol,
    );

    await AppDataSource.manager.save(usuarioProyecto);
};

export const crearProyecto = async (idUsuario: number, nombre: string) => {
    await AppDataSource.manager.transaction(async (dataSource) => {
        const obtenerUsuario = await obtenerDatos(Usuario, { id: idUsuario });
        const proyecto = new Proyecto(nombre);
        const rol = new Rol('Administrador', proyecto);
        const usuarioProyecto = new UsuarioProyecto(
            obtenerUsuario,
            proyecto,
            rol,
        );
        await dataSource.save(proyecto);
        await dataSource.save(rol);
        await dataSource.save(usuarioProyecto);
    });
};
