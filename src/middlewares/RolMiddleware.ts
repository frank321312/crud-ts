import { rolService, RolService } from '../services/RolService.js';
import { Request, Response, NextFunction } from 'express';
import { isValidId } from '../utils/util.js';

export class RolMiddleware {
    constructor(private readonly rolService: RolService) {}

    admistratorUpdate = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id, idProyecto } = req.params;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id rol requerido' });
            return;
        }

        try {
            const rol = await this.rolService.obtenerRolDelProyecto(
                Number(id),
                Number(idProyecto),
            );

            if (!rol) {
                res.status(404).json({ message: 'Rol no encontrado' });
                return;
            }

            if (rol.nombre == 'Administrador') {
                res.status(401).json({
                    message: 'No puede modificar el rol Admninistrador',
                });
                return;
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };
}

export const rolMiddleware = new RolMiddleware(rolService);
