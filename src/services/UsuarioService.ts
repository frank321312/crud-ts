import type { UpdateResult } from 'typeorm';
import { AppDataSource } from '../data-source.js';
import { Usuario } from '../entity/Usuario.js';
import type { SchemaUsuario } from '../schemas/UsuarioSchema.js';

export class UsuarioService {
    private usuarioRepository = AppDataSource.getRepository(Usuario);

    obtenerUsuarioPorId(
        id: number,
        pass: boolean = false,
    ): Promise<Usuario | null> {
        return this.usuarioRepository.findOne({
            select: pass
                ? ['contrasena']
                : [
                      'id',
                      'nombreUsuario',
                      'nombre',
                      'apellido',
                      'correoElectronico',
                      'fechaDeCreacion',
                  ],
            where: { id },
        });
    }

    obtenerUsuarioPorProyecto = (id: number, idProyecto: number) =>
        this.usuarioRepository
            .createQueryBuilder('u')
            .leftJoin('u.usuarioProyectos', 'up')
            .leftJoin('up.proyecto', 'p')
            .where('u.id = :id', { id })
            .andWhere('p.id = :idProyecto', { idProyecto })
            .getOne();

    crear = (usuario: SchemaUsuario): Promise<Usuario> => {
        const createUsuario = this.usuarioRepository.create(usuario);
        return this.usuarioRepository.save(createUsuario);
    };

    obtenerUsuarioLogueo = (cadena: string) =>
        this.usuarioRepository.findOne({
            select: ['nombreUsuario', 'contrasena'],
            where: [{ nombreUsuario: cadena }, { correoElectronico: cadena }],
        });

    eliminar = (id: number) => {
        return this.usuarioRepository.delete({ id });
    };

    actualizar = (
        id: number,
        usuario: SchemaUsuario,
    ): Promise<UpdateResult> => {
        return this.usuarioRepository.update(id, usuario);
    };
}

export const usuarioService = new UsuarioService();
