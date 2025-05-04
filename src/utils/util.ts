import type {
    EntityTarget,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
} from 'typeorm';
import {
    Proyecto,
    Rol,
    Usuario,
    UsuarioNoVerificado,
    UsuarioProyecto,
} from '../entity/index.js';
import { AppDataSource } from '../data-source.js';

type Entities =
    | Proyecto
    | Rol
    | Usuario
    | UsuarioNoVerificado
    | UsuarioProyecto;
export const obtenerDatos = async <T extends Entities>(
    entity: EntityTarget<T>,
    where: FindOptionsWhere<T>,
    select?: FindOptionsSelect<T>,
    relations?: FindOptionsRelations<T>,
    withDeleted?: boolean,
) =>
    await AppDataSource.getRepository(entity).findOneOrFail({
        where,
        select,
        relations,
        withDeleted,
    });
