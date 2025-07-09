import { ProyectoService } from '../services/ProyectoService.js';
import { UsuarioProyectoService } from '../services/UsuarioProyectoService.js';
import type { Request, Response } from 'express';
import { isValidId, responseZodError } from '../utils/util.js';
import { proyectoSchema } from '../schemas/ProyectoSchema.js';
import { RolService } from '../services/RolService.js';
import { getUserToken } from '../utils/token.util.js';
import { UsuarioService } from '../services/UsuarioService.js';
import { RecordNotFoundException } from '../exceptions/RecordNotFound.js';
import { DuplicateAdministratorException } from '../exceptions/DuplicateAdministrator.js';
import { DuplicateUserRolException } from '../exceptions/DuplicateUserRol.js';

export class ProyectoController {
    constructor(
        private readonly usuarioProyectoService: UsuarioProyectoService,
        private readonly proyectoService: ProyectoService,
        private readonly rolService: RolService,
        private readonly usuarioService: UsuarioService,
    ) {}

    crear = async (req: Request, res: Response) => {
        const { nombre } = req.body;
        const validateName = proyectoSchema.safeParse(nombre);

        if (!validateName.success) {
            res.status(422).json(responseZodError(validateName.error));
            return;
        }

        const { nombreUsuario, id } = getUserToken(req);

        try {
            const proyecto = await this.proyectoService.crear(nombre);
            const rol = await this.rolService.crear(
                'Administrador',
                proyecto.id,
            );

            const usuario = await this.usuarioService.obtenerUsuarioPorId(
                Number(id),
            );

            if (!usuario) {
                res.status(404).json({
                    message: `${nombreUsuario} no se encontro su id`,
                });
                return;
            }

            await this.usuarioProyectoService.crear(proyecto, rol, usuario!);

            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    };

    agregarUsuario = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { idRol, idUsuario } = req.body;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id proyecto requerido' });
            return;
        } else if (isValidId(idRol)) {
            res.status(400).json({ message: 'Id rol requerido' });
            return;
        }

        try {
            await this.usuarioProyectoService.agregarUsuario(
                Number(idUsuario),
                Number(id),
                Number(idRol),
            );

            res.status(204).send();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else if (error instanceof DuplicateAdministratorException) {
                res.status(409).json({ message: error.message });
            } else if (error instanceof DuplicateUserRolException) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({
                    message: 'No se puede agregar usuarios en este momento',
                });
            }
        }
    };

    obtenerUsuarios = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id requerido' });
            return;
        }

        const usuarios = await this.usuarioProyectoService.obtenerUsuarios(
            Number(id),
        );

        res.status(200).json({ usuarios });
    };

    actualizar = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nombre } = req.body;

        const validateName = proyectoSchema.safeParse(nombre);

        if (!validateName.success) {
            res.status(422).json(responseZodError(validateName.error));
            return;
        }

        try {
            await this.proyectoService.actualizar(Number(id), nombre);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo guardar los cambios en este momento',
            });
        }
    };

    finalizar = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const proyecto = await this.proyectoService.obtenerProyectoPorId(
                Number(id),
            );

            if (proyecto?.completado) {
                res.status(204).send();
                return;
            }

            await this.proyectoService.finalizar(Number(id));
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo finalizar el proyecto en este momento',
            });
        }
    };

    reasignarRol = async (req: Request, res: Response) => {
        const { idUsuarioProyecto, idRol, idUsuario } = req.body;

        if (isValidId(idUsuarioProyecto)) {
            res.status(400).json({ message: 'Id proyecto xrequerido' });
            return;
        }

        if (isValidId(idRol)) {
            res.status(400).json({ message: 'Id rol requerido' });
            return;
        }

        try {
            const usuarioProyecto =
                await this.usuarioProyectoService.existeUsuario(
                    Number(idUsuarioProyecto),
                    Number(idUsuario),
                    Number(req.params.id),
                );

            if (!usuarioProyecto) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }

            await this.usuarioProyectoService.reasignarRol(
                Number(idUsuarioProyecto),
                Number(idRol),
                Number(req.params.id),
            );
            res.status(204).send();
        } catch (error) {
            if (error instanceof RecordNotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                console.log(error);
                res.status(500).json({
                    message: 'No se pudo reasignar el rol en este momento',
                });
            }
        }
    };

    eliminarUsuario = async (req: Request, res: Response) => {
        const { idUsuarioAsignado, id } = req.params;

        if (isValidId(idUsuarioAsignado)) {
            res.status(400).json({ message: 'Id usuario requerido' });
            return;
        }

        try {
            const usuario = await this.usuarioService.obtenerUsuarioPorProyecto(
                Number(idUsuarioAsignado),
                Number(id),
            );

            if (!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }

            await this.usuarioProyectoService.eliminarUsuario(
                Number(idUsuarioAsignado),
                Number(id),
            );
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo eliminar al usuario en este momento',
            });
        }
    };

    eliminarProyecto = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            await this.proyectoService.eliminar(Number(id));
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo eliminar el proyecto en este momento',
            });
        }
    };

    abandonarProyecto = async (req: Request, res: Response) => {
        const { id } = req.params;

        const usuario = getUserToken(req);

        try {
            const isAdministrator =
                await this.usuarioProyectoService.esAdministrador(
                    Number(usuario.id),
                );

            if (isAdministrator) {
                res.status(401).json({
                    message:
                        'No puede abandonar el proyecto al menos que lo elimine',
                });
                return;
            }

            await this.usuarioProyectoService.abandonar(
                Number(id),
                Number(usuario.id),
            );

            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo realizar la acción en este momento',
            });
        }
    };
}
