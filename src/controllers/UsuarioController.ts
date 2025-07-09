import type { Request, Response } from 'express';
import type { UsuarioService } from '../services/UsuarioService.js';
import {
    schemaContrasena,
    schemaEmail,
    SchemaUsuario,
    schemaUsuario,
} from '../schemas/UsuarioSchema.js';
import { createToken, getUserToken } from '../utils/token.util.js';
import { compareString, encryptString } from '../utils/bcrypt.util.js';
import { QueryFailedError } from 'typeorm';
import { QueryError } from '../utils/types.util.js';
import { isValidId, responseZodError } from '../utils/util.js';
import { UsuarioProyectoService } from '../services/UsuarioProyectoService.js';
import { ProyectoService } from '../services/ProyectoService.js';

export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly usuarioProyectoService: UsuarioProyectoService,
        private readonly proyectoService: ProyectoService,
    ) {}

    obtenerUsuarioPorId = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (isValidId(id)) {
            res.status(400).json({ message: 'Id usuario requerido' });
            return;
        }

        const usuario = await this.usuarioService.obtenerUsuarioPorId(
            Number(id),
        );
        res.status(200).json({
            usuario,
        });
    };

    crear = async (req: Request, res: Response) => {
        const validateSchema = schemaUsuario.safeParse(req.body);

        if (!validateSchema.success) {
            res.status(422).json(responseZodError(validateSchema.error));
            return;
        }

        const { contrasena, ...resto } = validateSchema.data;

        try {
            const { nombreUsuario, id } = await this.usuarioService.crear({
                ...resto,
                contrasena: await encryptString(contrasena),
            } as SchemaUsuario);

            const token = createToken({ nombreUsuario, id });

            res.status(200).json({ token });
        } catch (error) {
            if (
                error instanceof QueryFailedError &&
                (error.driverError as QueryError).code == 'ER_DUP_ENTRY'
            ) {
                const queryError = error.driverError as QueryError;
                if (queryError.sqlMessage.includes('IDX_EMAIL_UNIQUE')) {
                    res.status(409).json({ message: 'Email en uso' });
                } else {
                    res.status(409).json({
                        message: 'Nombre de usuario en uso',
                    });
                }
            } else {
                res.status(500).json({
                    message: 'No se puede registrar en este momento',
                });
            }
        }
    };

    iniciarSesion = async (req: Request, res: Response) => {
        const { cadena, contrasena } = req.body;

        if (!cadena) {
            res.status(400).json({ message: 'Requerido', path: 'cadena' });
            return;
        } else if (!contrasena) {
            res.status(400).json({ message: 'Requerido', path: 'contrasena' });
            return;
        }

        const usuario = await this.usuarioService.obtenerUsuarioLogueo(cadena);

        if (!usuario) {
            res.status(404).json({ message: 'Credenciales invalidas' });
            return;
        }

        const isValidatePassword = await compareString(
            contrasena,
            usuario.contrasena,
        );

        if (!isValidatePassword) {
            res.status(422).json({ message: 'Credenciales invalidas' });
            return;
        }

        const token = createToken(usuario);

        res.status(200).json({ token });
    };

    actualizarDatosNoImporantes = async (req: Request, res: Response) => {
        const validateSchema = schemaUsuario.safeParse({
            ...req.body,
            correoElectronico: 'pepito123@gmail.com',
            contrasena: 'Contrase123456',
        });

        if (!validateSchema.success) {
            res.status(422).json(responseZodError(validateSchema.error));
            return;
        }

        const { nombreUsuario, nombre, apellido } = validateSchema.data;
        const { id } = getUserToken(req);

        try {
            await this.usuarioService.actualizar(id, {
                nombreUsuario,
                nombre,
                apellido,
            } as SchemaUsuario);

            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No cambiar sus datos en este momento',
            });
        }
    };

    actualizarCorreoElectronico = async (req: Request, res: Response) => {
        const { correoElectronico, contrasena } = req.body;
        const validateSchema = schemaEmail.safeParse(correoElectronico);

        if (!validateSchema.success) {
            res.status(422).json(responseZodError(validateSchema.error));
            return;
        }

        const { id } = getUserToken(req);

        try {
            const usuario = await this.usuarioService.obtenerUsuarioPorId(
                id,
                true,
            );
            const isValidPassword = await compareString(
                contrasena,
                usuario!.contrasena,
            );

            if (!isValidPassword) {
                res.status(401).json({ message: 'Contraseña invalida' });
                return;
            }

            await this.usuarioService.actualizar(id, {
                correoElectronico,
            } as SchemaUsuario);

            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo cambiar el email en este momento',
            });
        }
    };

    actualizarContrasena = async (req: Request, res: Response) => {
        const { contrasenaNuevo, contrasenaAntigua } = req.body;
        const validateSchema = schemaContrasena.safeParse(contrasenaNuevo);

        if (!validateSchema.success) {
            res.status(422).json(responseZodError(validateSchema.error));
            return;
        }

        const { id } = getUserToken(req);

        try {
            const usuario = await this.usuarioService.obtenerUsuarioPorId(
                id,
                true,
            );
            const isValidPassword = await compareString(
                contrasenaAntigua,
                usuario!.contrasena,
            );

            if (!isValidPassword) {
                res.status(401).json({ message: 'Contraseña invalida' });
                return;
            }

            await this.usuarioService.actualizar(id, {
                contrasena: await encryptString(contrasenaNuevo),
            } as SchemaUsuario);

            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo cambiar la contraseña en este momento',
            });
        }
    };

    eliminar = async (req: Request, res: Response) => {
        const { id } = getUserToken(req);

        try {
            const proyectos =
                await this.usuarioProyectoService.obtenerUsuarioAdministrador(
                    Number(id),
                );
            const ids = proyectos.map((x) => x.proyecto.id);

            if (ids.length > 0) {
                await this.proyectoService.eliminarProyectos(ids);
            }

            await this.usuarioService.eliminar(id);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se pudo eliminar su cuenta en este momento',
            });
        }
    };
}
