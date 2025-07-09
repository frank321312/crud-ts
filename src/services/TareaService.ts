import { AppDataSource } from '../data-source.js';
import { Tarea } from '../entity/Tarea.js';
import { proyectoService, ProyectoService } from './ProyectoService.js';
import { usuarioService, UsuarioService } from './UsuarioService.js';
import { RecordNotFoundException } from '../exceptions/RecordNotFound.js';

export class TareaService {
    private readonly tareaRepository = AppDataSource.getRepository(Tarea);

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly proyectoService: ProyectoService,
    ) {}

    obtenerTareasPorProyecto = (idProyecto: number) =>
        this.tareaRepository
            .createQueryBuilder('t')
            .leftJoin('t.proyecto', 'p')
            .leftJoinAndSelect('t.usuarioCreador', 'uc')
            .leftJoinAndSelect('t.usuarioAsignado', 'ua')
            .select(['t.id', 'uc.nombre', 'ua.nombre', 't.contenido'])
            .where('p.id = :idProyecto', { idProyecto })
            .getMany();

    obtenerTareaPorId = (id: number) =>
        this.tareaRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.usuarioCreador', 'uc')
            .leftJoinAndSelect('t.usuarioAsignado', 'ua')
            .select(['uc.nombre', 'uc.id', 'ua.nombre', 'ua.id', 't.contenido'])
            .where('t.id = :id', { id })
            .getOne();

    obtenerTareasNullPorUsuario = (idUsuario: number, idProyecto: number) =>
        this.tareaRepository
            .createQueryBuilder('t')
            .leftJoin('t.usuarioAsignado', 'ua')
            .leftJoin('t.proyecto', 'p')
            .select(['t.id'])
            .where('ua.id = :idUsuario', { idUsuario })
            .andWhere('p.id = :idProyecto', { idProyecto })
            .andWhere('t.fechaDeFinalizacion IS NULL')
            .getMany();

    obtenerTareasPorUsuario = (idUsuario: number, idProyecto: number) =>
        this.tareaRepository
            .createQueryBuilder('t')
            .leftJoin('t.usuarioAsignado', 'ua')
            .leftJoin('t.proyecto', 'p')
            .where('ua.id = :idUsuario', { idUsuario })
            .andWhere('p.id = :idProyecto', { idProyecto })
            .getMany();

    obtenerTareaPorProyecto = (id: number, idProyecto: number) =>
        this.tareaRepository
            .createQueryBuilder('t')
            .leftJoin('t.proyecto', 'p')
            .where('t.id = :id', { id })
            .andWhere('p.id = :idProyecto', { idProyecto })
            .getOne();

    crear = async (
        idUsuarioAsignado: number,
        idUsuarioCreador: number,
        idProytecto: number,
        titulo: string,
        contenido: string,
    ) => {
        const usuarioAsignado =
            await this.usuarioService.obtenerUsuarioPorProyecto(
                idUsuarioAsignado,
                idProytecto,
            );

        if (!usuarioAsignado)
            throw new RecordNotFoundException('Usuario no encontrado');

        const proyecto =
            await this.proyectoService.obtenerProyectoPorId(idProytecto);

        if (!proyecto)
            throw new RecordNotFoundException('Proyecto no encontrado');

        const usuarioCreador =
            await this.usuarioService.obtenerUsuarioPorId(idUsuarioCreador);

        const tarea = new Tarea(
            titulo,
            contenido,
            usuarioAsignado,
            usuarioCreador!,
            proyecto,
        );

        return this.tareaRepository.save(tarea);
    };

    editar = async (
        id: number,
        idProyecto: number,
        titulo?: string,
        contenido?: string,
    ) => {
        const tarea = await this.obtenerTareaPorProyecto(id, idProyecto);
        if (!tarea) {
            throw new RecordNotFoundException('Tarea no encontrada');
        }

        return this.tareaRepository.update(id, { titulo, contenido });
    };

    completado = async (id: number, idProyecto: number) => {
        const tarea = await this.obtenerTareaPorProyecto(id, idProyecto);

        if (!tarea) {
            throw new RecordNotFoundException('Tarea no encontrada');
        }

        if (tarea.fechaDeFinalizacion) {
            return;
        }

        return this.tareaRepository.update(id, {
            fechaDeFinalizacion: new Date(),
        });
    };

    eliminar = async (id: number, idProyecto: number) => {
        const tarea = await this.obtenerTareaPorProyecto(id, idProyecto);
        if (!tarea) {
            throw new RecordNotFoundException('Tarea no encontrada');
        }
        return this.tareaRepository.delete(id);
    };

    reasignarTarea = async (
        id: number,
        idUsuarioAsignado: number,
        idProyecto: number,
    ) => {
        const usuario = await this.usuarioService.obtenerUsuarioPorProyecto(
            idUsuarioAsignado,
            idProyecto,
        );

        if (!usuario) {
            throw new RecordNotFoundException('Usuario no enconhtrado');
        }

        return this.tareaRepository.update(id, { usuarioAsignado: usuario });
    };
}

export const tareaService = new TareaService(usuarioService, proyectoService);
