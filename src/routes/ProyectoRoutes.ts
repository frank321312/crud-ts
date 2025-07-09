import { Router } from 'express';
import { ProyectoController } from '../controllers/ProyectoController.js';
import { usuarioProyectoService } from '../services/UsuarioProyectoService.js';
import { proyectoService } from '../services/ProyectoService.js';
import { rolService } from '../services/RolService.js';
import { usuarioService } from '../services/UsuarioService.js';
import { usuarioMiddleware } from '../middlewares/UsuarioMiddleware.js';

const router = Router();
export const proyectoController = new ProyectoController(
    usuarioProyectoService,
    proyectoService,
    rolService,
    usuarioService,
);

router.get('/get-users-by-project/:id', proyectoController.obtenerUsuarios);

router.delete('/abandon-project/:id', proyectoController.abandonarProyecto);

router.use(usuarioMiddleware.isAdministrator);

router.post('/add/:id', proyectoController.agregarUsuario);

router.patch('/update/:id', proyectoController.actualizar);

router.patch('/assing-rol/:id', proyectoController.reasignarRol);

router.patch('/finalized/:id', proyectoController.finalizar);

router.delete(
    '/delete-user/:idUsuarioAsignado/:id',
    proyectoController.eliminarUsuario,
);

router.delete('/delete/:id', proyectoController.eliminarProyecto);

export default router;
