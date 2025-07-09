import { AppDataSource } from '../data-source.js';
import { Proyecto, Rol, Usuario, UsuarioProyecto } from '../entity/index.js';
import { DuplicateAdministratorException } from '../exceptions/DuplicateAdministrator.js';
import { DuplicateUserRolException } from '../exceptions/DuplicateUserRol.js';
import { RecordNotFoundException } from '../exceptions/RecordNotFound.js';
import { proyectoService, ProyectoService } from './ProyectoService.js';
import { rolService, RolService } from './RolService.js';
import { usuarioService, UsuarioService } from './UsuarioService.js';

export class UsuarioProyectoService {
    private readonly usuarioProyectoRepository =
        AppDataSource.getRepository(UsuarioProyecto);

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly rolService: RolService,
        private readonly proyectoService: ProyectoService,
    ) {}

    obtenerUsuarios = (id: number) =>
        this.usuarioProyectoRepository.find({
            select: {
                proyecto: {},
                usuario: {
                    id: true,
                    nombreUsuario: true,
                    nombre: true,
                    apellido: true,
                    correoElectronico: true,
                },
            },
            where: { proyecto: { id } },
            relations: { proyecto: true, usuario: true, rol: true },
        });

    // Obtiene todos los registros sobre un usuario sobre el proyecto, pero solo se queda con el id de UsuarioProyecto
    obtenerTodoSobreUsuarioPorProyecto = (
        idUsuario: number,
        idProyecto: number,
    ) =>
        this.usuarioProyectoRepository
            .createQueryBuilder('up')
            .leftJoin('up.usuario', 'u')
            .leftJoin('up.proyecto', 'p')
            .select(['up.id'])
            .where('u.id = :idUsuario', { idUsuario })
            .andWhere('p.id = :idProyecto', { idProyecto })
            .getMany();

    obtenerUsuariosPorRol = (idRol: number) =>
        this.usuarioProyectoRepository
            .createQueryBuilder('up')
            .leftJoinAndSelect('up.rol', 'r')
            .select(['up.id'])
            .where('r.id = :idRol', { idRol })
            .getMany();

    obtenerUsuarioPorRol = (idUsuario: number, idRol: number) =>
        this.usuarioProyectoRepository
            .createQueryBuilder('up')
            .leftJoin('up.usuario', 'u')
            .leftJoin('up.rol', 'r')
            .where('u.id = :idUsuario', { idUsuario })
            .andWhere('r.id = :idRol', { idRol })
            .getOne();

    obtenerUsuarioAdministrador = (idUsuario: number) =>
        this.usuarioProyectoRepository
            .createQueryBuilder('up')
            .leftJoin('up.usuario', 'u')
            .leftJoin('up.rol', 'r')
            .leftJoinAndSelect('up.proyecto', 'p')
            .select(['up.id', 'p.id'])
            .where('u.id = :idUsuario', { idUsuario })
            .andWhere('r.nombre = "Administrador"')
            .getMany();
    existeUsuario = (id: number, idUsuario: number, idProyecto: number) =>
        this.usuarioProyectoRepository
            .createQueryBuilder('up')
            .leftJoin('up.usuario', 'u')
            .leftJoin('up.proyecto', 'p')
            .where('u.id = :idUsuario', { idUsuario })
            .andWhere('p.id = :idProyecto', { idProyecto })
            .andWhere('up.id = :id', { id })
            .getExists();

    crear = (proyecto: Proyecto, rol: Rol, usuario: Usuario) => {
        const nuevoUsuarioProyecto = new UsuarioProyecto(
            usuario,
            proyecto,
            rol,
        );
        const createUsuarioProyecto =
            this.usuarioProyectoRepository.create(nuevoUsuarioProyecto);
        return this.usuarioProyectoRepository.save(createUsuarioProyecto);
    };

    agregarUsuario = async (
        idUsuario: number,
        idProyecto: number,
        idRol: number,
    ) => {
        const usuario =
            await this.usuarioService.obtenerUsuarioPorId(idUsuario);

        if (!usuario)
            throw new RecordNotFoundException('Usuario no encontrado');

        const proyecto =
            await this.proyectoService.obtenerProyectoPorId(idProyecto);

        if (!proyecto)
            throw new RecordNotFoundException('Proyecto no encontrado');

        const rol = await this.rolService.obtenerRolDelProyecto(
            idRol,
            proyecto.id,
        );

        if (!rol) throw new RecordNotFoundException('Rol no encontrado');

        if (rol.nombre === 'Administrador')
            throw new DuplicateAdministratorException(
                'Solo puede haber un administrador por proyecto',
            );

        const usurioRol = await this.obtenerUsuarioPorRol(idUsuario, idRol);

        if (usurioRol) {
            throw new DuplicateUserRolException(
                'Este usuario ya esta agregado en el proyecto',
            );
        }

        const usuarioProyecto = this.usuarioProyectoRepository.create(
            new UsuarioProyecto(usuario, proyecto, rol),
        );

        return this.usuarioProyectoRepository.save(usuarioProyecto);
    };

    perteneceAlProyecto = async (idUsuaro: number, idProyecto: number) => {
        const usuario = await this.usuarioService.obtenerUsuarioPorId(idUsuaro);
        const proyecto =
            await this.proyectoService.obtenerProyectoPorId(idProyecto);

        if (!usuario) {
            throw new RecordNotFoundException('Usuario no encontrado');
        }

        if (!proyecto) {
            throw new RecordNotFoundException('Proyecto no encontrado');
        }

        return this.usuarioProyectoRepository.existsBy({ usuario, proyecto });
    };

    esAdministrador = (idUsuario: number) =>
        this.usuarioProyectoRepository.exists({
            where: {
                usuario: { id: idUsuario },
                rol: { nombre: 'Administrador' },
            },
            relations: { usuario: true, rol: true },
        });

    eliminarUsuario = (idUsuario: number, idProyecto: number) => {
        return this.usuarioProyectoRepository.delete({
            usuario: { id: idUsuario },
            proyecto: { id: idProyecto },
        });
    };

    reasignarRol = async (id: number, idRol: number, idProyecto: number) => {
        const rol = await this.rolService.obtenerRolPorId(idRol, idProyecto);

        if (!rol) {
            throw new RecordNotFoundException('Rol no encontrado');
        }

        return this.usuarioProyectoRepository.update(id, { rol });
    };

    abandonar = async (idProyecto: number, idUsuario: number) => {
        const usuario = await this.obtenerTodoSobreUsuarioPorProyecto(
            idUsuario,
            idProyecto,
        );

        if (!usuario) {
            throw new RecordNotFoundException('Usuario no encontrado');
        }

        const idsUsuarioProyecto = usuario.map((x) => x.id);

        if (idsUsuarioProyecto.length > 0) {
            return this.usuarioProyectoRepository
                .createQueryBuilder()
                .delete()
                .where('id IN (:...ids)', { ids: idsUsuarioProyecto })
                .execute();
        }
    };
}

export const usuarioProyectoService = new UsuarioProyectoService(
    usuarioService,
    rolService,
    proyectoService,
);
