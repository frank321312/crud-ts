import type { Request, Response } from 'express';
import { ComentarioService } from '../services/ComentarioService.js';
import { isValidId } from '../utils/util.js';
import { RecordNotFoundException } from '../exceptions/RecordNotFound.js';
import { getUserToken } from '../utils/token.util.js';

export class ComentarioController {
    constructor(private readonly comentarioService: ComentarioService) {}

    obtenerComenatiosPorTarea = async (req: Request, res: Response) => {
        const { idTarea } = req.params;

        if (isValidId(idTarea)) {
            res.status(400).json({ message: 'Id tarea requerido' });
            return;
        }

        const comentarios =
            await this.comentarioService.obtenerComentariosPorTarea(
                Number(idTarea),
            );

        res.status(200).json({ comentarios });
    };

    crear = async (req: Request, res: Response) => {
        const { idProyecto } = req.params;
        const { contenido, idTarea } = req.body;

        if (!contenido) {
            res.status(400).json({ message: 'Contenido requerido' });
            return;
        } else if (contenido.length < 20) {
            res.status(422).json({
                message: 'El contenido debe tener minimo 20 caracteres',
            });
            return;
        }

        if (isValidId(idTarea)) {
            res.status(400).json({ message: 'Id tarea requerido' });
            return;
        }

        const usuario = getUserToken(req);

        try {
            await this.comentarioService.crear(
                contenido,
                Number(idTarea),
                Number(usuario.id),
                Number(idProyecto),
            );
            res.status(204).send();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({
                    message: 'No se pudo crear el comentario en este momento',
                });
            }
        }
    };

    editar = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { contenido } = req.body;

        if (!contenido) {
            res.status(400).json({ message: 'Contenido requerido' });
            return;
        } else if (contenido.length < 20) {
            res.status(422).json({
                message: 'El contenido debe tener minimo 20 caracteres',
            });
            return;
        }

        try {
            await this.comentarioService.editar(Number(id), contenido);
            res.status(204).send();
        } catch (error) {
            console.log('Sappe', error);
            res.status(500).json({
                message: 'No se pudo guardar los cambios en este momento',
            });
        }
    };

    eliminar = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id comentario requerido' });
            return;
        }

        try {
            await this.comentarioService.eliminar(Number(id));
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo eliminar el comentario en este momento',
            });
        }
    };
}
