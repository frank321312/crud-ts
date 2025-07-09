import { AppDataSource } from '../data-source.js';
import { Proyecto, Rol, Usuario, UsuarioProyecto } from '../entity/index.js';

export async function insertarUsuarioProyecto() {
    const usuarios = await AppDataSource.getRepository(Usuario).find({
        skip: 5,
        take: Number.MAX_SAFE_INTEGER,
    });
    const roles = await AppDataSource.getRepository(Rol).find({
        relations: { proyecto: true },
    });
    const proyectos = await AppDataSource.getRepository(Proyecto).find();

    for (const usuario of usuarios) {
        const indexRandomProyecto = Math.floor(
            Math.random() * proyectos.length,
        );
        const proyecto = proyectos[indexRandomProyecto];
        const rolesPorProyecto = roles.filter(
            (r) => r.proyecto.id == proyecto!.id,
        );
        const indexRandomRol = Math.floor(
            Math.random() * rolesPorProyecto.length,
        );
        const nuevoUsuarioProyecto = new UsuarioProyecto(
            usuario,
            proyecto!,
            rolesPorProyecto[indexRandomRol]!,
        );
        await AppDataSource.manager.save(nuevoUsuarioProyecto);
    }
}
