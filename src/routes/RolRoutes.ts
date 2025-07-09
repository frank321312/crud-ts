import { Router } from 'express';
import { RolController } from '../controllers/RolController.js';
import { rolService } from '../services/RolService.js';
import { usuarioMiddleware } from '../middlewares/UsuarioMiddleware.js';
import { usuarioProyectoService } from '../services/UsuarioProyectoService.js';
import { rolMiddleware } from '../middlewares/RolMiddleware.js';

const router = Router();
const rolController = new RolController(rolService, usuarioProyectoService);

router.use(usuarioMiddleware.verifyExistenceOfUserInProject);
router.get(
    '/get-roles-by-project/:idProyecto',
    rolController.obtenerRolesPorProyecto,
);

router.use(usuarioMiddleware.isAdministrator);

router.post('/create/:idProyecto', rolController.crear);

router.patch(
    '/update/:id/:idProyecto',
    rolMiddleware.admistratorUpdate,
    rolController.actualizar,
);

router.delete(
    '/delete/:id/:idProyecto',
    rolMiddleware.admistratorUpdate,
    rolController.eliminar,
);

export default router;
