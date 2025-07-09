import { AppDataSource } from '../data-source.js';
import { Proyecto } from '../entity/Proyecto.js';

export class ProyectoService {
    private readonly proyectoRepository = AppDataSource.getRepository(Proyecto);

    obtenerProyectos = async (): Promise<Proyecto[]> => {
        return this.proyectoRepository.find();
    };

    obtenerProyectoPorId = (id: number) =>
        this.proyectoRepository.findOneBy({ id });

    obtenerProyectoPorNombre = (nombre: string) =>
        this.proyectoRepository.findOneBy({ nombre });

    crear = (nombre: string) => {
        const nuevoProyecto = new Proyecto(nombre);
        const createProyecto = this.proyectoRepository.create(nuevoProyecto);
        return this.proyectoRepository.save(createProyecto);
    };

    actualizar = (id: number, nombre: string) =>
        this.proyectoRepository.update(id, { nombre });

    finalizar = (id: number) =>
        this.proyectoRepository.update(id, { completado: new Date() });

    eliminar = (id: number) => this.proyectoRepository.delete({ id });

    eliminarProyectos = (ids: number[]) =>
        this.proyectoRepository
            .createQueryBuilder()
            .delete()
            .where('id IN (:...ids)', { ids })
            .execute();
}

export const proyectoService = new ProyectoService();
