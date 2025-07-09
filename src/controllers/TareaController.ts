import type { Request, Response } from 'express';
import { TareaService } from '../services/TareaService.js';
import { isValidId } from '../utils/util.js';
import { getUserToken } from '../utils/token.util.js';
import { RecordNotFoundException } from '../exceptions/RecordNotFound.js';
import { UsuarioProyectoService } from '../services/UsuarioProyectoService.js';

export class TareaController {
    constructor(
        private readonly tareaService: TareaService,
        private readonly usuarioProyectoService: UsuarioProyectoService,
    ) {}

    obtenerTareasPorProyecto = async (req: Request, res: Response) => {
        const { idProyecto } = req.params;

        const tareas = await this.tareaService.obtenerTareasPorProyecto(
            Number(idProyecto),
        );

        res.status(200).json({ tareas });
    };

    obtenerTareaPorId = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id tarea requerido' });
            return;
        }

        const tarea = await this.tareaService.obtenerTareaPorId(Number(id));

        if (!tarea) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }

        res.status(200).json({ tarea });
    };

    obtenerTareasPorUsuario = async (req: Request, res: Response) => {
        const { idUsuario, idProyecto } = req.params;

        if (isValidId(idUsuario)) {
            res.status(400).json({ message: 'Id usuario requerido' });
            return;
        }

        try {
            const perteneceUsuario =
                await this.usuarioProyectoService.perteneceAlProyecto(
                    Number(idUsuario),
                    Number(idProyecto),
                );

            if (!perteneceUsuario) {
                res.status(404).json({
                    message: 'El usuario no pertenece al proyecto',
                });
                return;
            }

            const tareas = await this.tareaService.obtenerTareasPorUsuario(
                Number(idUsuario),
                Number(idProyecto),
            );
            res.status(200).json({ tareas });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo obtener las tareas en este momento',
            });
        }
    };

    crear = async (req: Request, res: Response) => {
        const { idProyecto } = req.params;
        const { idUsuarioAsignado, titulo, contenido } = req.body;

        if (isValidId(idUsuarioAsignado)) {
            res.status(400).json({ message: 'Id usuario a asignar requerido' });
            return;
        }

        const { id } = getUserToken(req);

        try {
            await this.tareaService.crear(
                Number(idUsuarioAsignado),
                id,
                Number(idProyecto),
                titulo,
                contenido,
            );
            res.status(204).send();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({
                    message: 'No se pudo crear la tarea en este momento',
                });
            }
        }
    };

    editar = async (req: Request, res: Response) => {
        const { id, idProyecto } = req.params;
        const { titulo, contenido } = req.body;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id usuario a asignar requerido' });
            return;
        }

        try {
            await this.tareaService.editar(
                Number(id),
                Number(idProyecto),
                titulo,
                contenido,
            );
            res.status(204).send();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({
                    message: 'No se pudo guardar los cambios en este momento',
                });
            }
        }
    };

    reasignarTarea = async (req: Request, res: Response) => {
        const { id, idUsuario, idProyecto } = req.params;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id tarea requerido' });
            return;
        }

        try {
            const tarea = await this.tareaService.obtenerTareaPorProyecto(
                Number(id),
                Number(idProyecto),
            );

            if (!tarea) {
                res.status(404).json({ message: 'Tarea no encontrada' });
                return;
            }

            await this.tareaService.reasignarTarea(
                Number(id),
                Number(idUsuario),
                Number(idProyecto),
            );
            res.status(204).send();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({
                    message: 'No se pudo reasignar el tarea en este momento',
                });
            }
        }
    };

    eliminar = async (req: Request, res: Response) => {
        const { id, idProyecto } = req.params;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id tarea requerido' });
            return;
        }

        try {
            await this.tareaService.eliminar(Number(id), Number(idProyecto));
            res.status(204).send();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({
                    message: 'No se pudo eliminar la tarea en este momento',
                });
            }
        }
    };

    completado = async (req: Request, res: Response) => {
        const { id, idProyecto } = req.params;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id tarea requerido' });
            return;
        }

        try {
            await this.tareaService.completado(Number(id), Number(idProyecto));
            res.status(204).send();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({
                    message: 'No se puede realizar esta accion en este momento',
                });
            }
        }
    };
}
