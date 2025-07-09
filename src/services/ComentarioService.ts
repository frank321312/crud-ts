import { AppDataSource } from '../data-source.js';
import { Comentario } from '../entity/Comentario.js';
import { RecordNotFoundException } from '../exceptions/RecordNotFound.js';
import { tareaService, TareaService } from './TareaService.js';
import { usuarioService, UsuarioService } from './UsuarioService.js';

export class ComentarioService {
    private readonly comentarioRepository =
        AppDataSource.getRepository(Comentario);

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly tareaService: TareaService,
    ) {}

    obtenerComentariosPorTarea = (idTarea: number) =>
        this.comentarioRepository
            .createQueryBuilder('c')
            .leftJoin('c.tarea', 't')
            .where('t.id = :idTarea', { idTarea })
            .orderBy('c.fechaDeCreacion', 'DESC')
            .getMany();

    crear = async (
        contenido: string,
        idTarea: number,
        idUsuario: number,
        idProyecto: number,
    ) => {
        const tarea = await this.tareaService.obtenerTareaPorProyecto(
            idTarea,
            idProyecto,
        );

        if (!tarea) {
            throw new RecordNotFoundException('Tarea no encontrada');
        }

        const usuario = await this.usuarioService.obtenerUsuarioPorProyecto(
            idUsuario,
            idProyecto,
        );

        if (!usuario) {
            throw new RecordNotFoundException('Usuario no encontrado');
        }

        const comentario = new Comentario(contenido, tarea, usuario);

        return this.comentarioRepository.save(comentario);
    };

    editar = (id: number, contenido: string) =>
        this.comentarioRepository.update(id, { contenido, editado: true });

    eliminar = (id: number) => this.comentarioRepository.delete(id);

    isCreator = (id: number, idUsuario: number) =>
        this.comentarioRepository.exists({
            where: { id, usuario: { id: idUsuario } },
            relations: { usuario: true },
        });
}

export const comentarioService = new ComentarioService(
    usuarioService,
    tareaService,
);
