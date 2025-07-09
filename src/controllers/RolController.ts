import { RolService } from '../services/RolService.js';
import type { Request, Response } from 'express';
import { isValidId, responseZodError } from '../utils/util.js';
import { RecordNotFoundException } from '../exceptions/RecordNotFound.js';
import { schemaRol } from '../schemas/RolSchema.js';
import { UsuarioProyectoService } from '../services/UsuarioProyectoService.js';

export class RolController {
    constructor(
        private readonly rolService: RolService,
        private readonly usuarioProyectoService: UsuarioProyectoService,
    ) {}

    obtenerRolesPorProyecto = async (req: Request, res: Response) => {
        const { idProyecto } = req.params;

        if (isValidId(idProyecto)) {
            res.status(400).json({ message: 'Id requerido' });
        }

        const roles = await this.rolService.obtenerRolesPorProyecto(
            Number(idProyecto),
        );

        res.status(200).json({ roles });
    };

    crear = async (req: Request, res: Response) => {
        const { idProyecto } = req.params;
        const { nombre } = req.body;
        const validateNombre = schemaRol.safeParse(nombre);

        if (isValidId(idProyecto)) {
            res.status(400).json({ message: 'Id proyecto requerido' });
            return;
        }

        if (!validateNombre.success) {
            res.status(422).json(responseZodError(validateNombre.error));
            return;
        }

        try {
            const isValid = await this.rolService.existeRol(
                nombre,
                Number(idProyecto),
            );

            if (isValid) {
                res.status(409).json({ message: 'Este rol ya existe' });
                return;
            }

            await this.rolService.crear(nombre, Number(idProyecto));
            res.status(204).send();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'No se pudo crear el rol en este momento',
                });
            }
        }
    };

    actualizar = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nombre } = req.body;
        const validateNombre = schemaRol.safeParse(nombre);

        if (!validateNombre.success) {
            res.status(422).json(responseZodError(validateNombre.error));
            return;
        }

        try {
            await this.rolService.actualizar(Number(id), nombre);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo guardar los cambios en este momento',
            });
        }
    };

    eliminar = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            await this.rolService.eliminar(Number(id));
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo eliminar el rol en este momento',
            });
        }
    };
}
