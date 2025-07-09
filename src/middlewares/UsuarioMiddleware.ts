import { Request, Response, NextFunction } from 'express';
import {
    usuarioProyectoService,
    UsuarioProyectoService,
} from '../services/UsuarioProyectoService.js';
import { isValidId } from '../utils/util.js';
import { getUserToken } from '../utils/token.util.js';
import { RecordNotFoundException } from '../exceptions/RecordNotFound.js';
import {
    comentarioService,
    ComentarioService,
} from '../services/ComentarioService.js';

export class UsuarioMiddleware {
    constructor(
        private readonly usuarioProyectoService: UsuarioProyectoService,
        private readonly comentarioService: ComentarioService,
    ) {}

    verifyExistenceOfUserInProject = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const spltUrl = req.url.split('/');
        const idProyecto = spltUrl[spltUrl.length - 1];

        if (isValidId(idProyecto)) {
            res.status(400).json({ message: 'Id proyecto requerido' });
            return;
        }

        const { nombreUsuario, id } = getUserToken(req);

        try {
            const isValid =
                await this.usuarioProyectoService.perteneceAlProyecto(
                    Number(id),
                    Number(idProyecto),
                );

            if (!isValid) {
                res.status(404).json({
                    message: `${nombreUsuario} no pertenece al proyecto`,
                });
                return;
            }

            next();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        }
    };

    isAdministrator = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = getUserToken(req);

        try {
            const isValid = await this.usuarioProyectoService.esAdministrador(
                Number(id),
            );

            if (!isValid) {
                res.status(401).json({
                    message: 'No esta autorizado para realizar esta acción',
                });
                return;
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };

    isCreatorOfComent = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id comentario requerido' });
            return;
        }

        const usuario = getUserToken(req);
        const isAdministrator =
            await this.usuarioProyectoService.esAdministrador(
                Number(usuario.id),
            );

        if (isAdministrator && req.url.includes('delete')) {
            next();
            return;
        }

        const isValid = await this.comentarioService.isCreator(
            Number(id),
            Number(usuario.id),
        );

        if (!isValid) {
            res.status(401).json({
                message: 'No tiene autorizacion para realizar esta acción',
            });
            return;
        }

        next();
    };
}

export const usuarioMiddleware = new UsuarioMiddleware(
    usuarioProyectoService,
    comentarioService,
);
