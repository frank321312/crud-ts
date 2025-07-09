import type { UpdateResult } from 'typeorm';
import { AppDataSource } from '../data-source.js';
import { Rol } from '../entity/Rol.js';
import { proyectoService, ProyectoService } from './ProyectoService.js';
import { RecordNotFoundException } from '../exceptions/RecordNotFound.js';

export class RolService {
    private rolRepository = AppDataSource.getRepository(Rol);

    constructor(private readonly proyectoService: ProyectoService) {}

    obtenerRolDelProyecto = (id: number, idProyecto: number) =>
        this.rolRepository
            .createQueryBuilder('r')
            .leftJoin('r.proyecto', 'p')
            .where('p.id = :idProyecto', { idProyecto })
            .andWhere('r.id = :id', { id })
            .getOne();

    obtenerRolesPorProyecto = (idProyecto: number) =>
        this.rolRepository
            .createQueryBuilder('r')
            .leftJoin('r.proyecto', 'p')
            .where('p.id = :idProyecto', { idProyecto })
            .andWhere('r.nombre != "Administrador"')
            .getMany();

    obtenerRolPorId = (id: number, idProyecto: number) =>
        this.rolRepository
            .createQueryBuilder('r')
            .leftJoin('r.proyecto', 'p')
            .where('r.id = :id', { id })
            .andWhere('p.id = :idProyecto', { idProyecto })
            .getOne();

    existeRol = (nombre: string, idProyecto: number) =>
        this.rolRepository.exists({
            where: { nombre, proyecto: { id: idProyecto } },
            relations: { proyecto: true },
        });

    crear = async (nombre: string, idProyecto: number): Promise<Rol> => {
        const proyecto =
            await this.proyectoService.obtenerProyectoPorId(idProyecto);

        if (!proyecto) {
            throw new RecordNotFoundException('Proyecto no encontrado');
        }

        const createRol = new Rol(nombre, proyecto);
        const createUsuario = this.rolRepository.create(createRol);
        return this.rolRepository.save(createUsuario);
    };

    actualizar = (id: number, nombre: string): Promise<UpdateResult> => {
        return this.rolRepository.update({ id }, { nombre });
    };

    eliminar = (id: number) => {
        return this.rolRepository.delete({ id });
    };
}

export const rolService = new RolService(proyectoService);
