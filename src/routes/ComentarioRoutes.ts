import { Router } from 'express';
import { ComentarioController } from '../controllers/ComentarioController.js';
import { comentarioService } from '../services/ComentarioService.js';
import { usuarioMiddleware } from '../middlewares/UsuarioMiddleware.js';

const router = Router();
const comentarioController = new ComentarioController(comentarioService);

router.get(
    '/get-coments-by-task/:idTarea/:idProyecto',
    comentarioController.obtenerComenatiosPorTarea,
);

router.post('/create/:idProyecto', comentarioController.crear);

router.patch(
    '/update/:id/:idProyecto',
    usuarioMiddleware.isCreatorOfComent,
    comentarioController.editar,
);

router.delete(
    '/delete/:id/:idProyecto',
    usuarioMiddleware.isCreatorOfComent,
    comentarioController.eliminar,
);

export default router;
