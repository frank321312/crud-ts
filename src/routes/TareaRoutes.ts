import { Router } from 'express';
import { TareaController } from '../controllers/TareaController.js';
import { tareaService } from '../services/TareaService.js';
import { tareaMiddleware } from '../middlewares/TareaMiddleware.js';
import { usuarioProyectoService } from '../services/UsuarioProyectoService.js';

const router = Router();
const tareaController = new TareaController(
    tareaService,
    usuarioProyectoService,
);

router.get(
    '/get-tasks-by-project/:idProyecto',
    tareaController.obtenerTareasPorProyecto,
);
router.get('/get-task/:id/:idProyecto', tareaController.obtenerTareaPorId);
router.get(
    '/get-task-by-user/:idUsuario/:idProyecto',
    tareaController.obtenerTareasPorUsuario,
);

router.patch(
    '/update/:id/:idProyecto',
    tareaMiddleware.isValidContent,
    tareaController.editar,
);

router.patch(
    '/assing-task/:id/:idUsuario/:idProyecto',
    tareaController.reasignarTarea,
);

router.patch('/complete/:id/:idProyecto', tareaController.completado);

router.post(
    '/create/:idProyecto',
    tareaMiddleware.isValidContent,
    tareaController.crear,
);

router.patch('/assign-task/:id/:idProyecto', tareaController.reasignarTarea);

router.delete('/delete/:id/:idProyecto', tareaController.eliminar);

export default router;
