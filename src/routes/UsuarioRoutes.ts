import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { usuarioService } from '../services/UsuarioService.js';
import { usuarioProyectoService } from '../services/UsuarioProyectoService.js';
import { proyectoService } from '../services/ProyectoService.js';

const router = Router();
export const usuarioController = new UsuarioController(
    usuarioService,
    usuarioProyectoService,
    proyectoService,
);

router.get('/:id', usuarioController.obtenerUsuarioPorId);

router.patch(
    '/update-unimportant-data',
    usuarioController.actualizarDatosNoImporantes,
);
router.patch('/update-email', usuarioController.actualizarCorreoElectronico);
router.patch('/update-password', usuarioController.actualizarContrasena);

router.delete('/delete', usuarioController.eliminar);

export default router;
