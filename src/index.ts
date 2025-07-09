import { AppDataSource } from './data-source.js';
import { Usuario } from './entity/Usuario.js';
import { insertarProyecto } from './insert/InsertarProyecto.js';
import { insertarRol } from './insert/insertarRol.js';
import { insertarUsuario } from './insert/InsertarUsuario.js';
import { insertarUsuarioProyecto } from './insert/insertarUsuarioProyecto.js';
import express from 'express';
import usuarioRouter from './routes/UsuarioRoutes.js';
import rolRouter from './routes/RolRoutes.js';
import tareaRouter from './routes/TareaRoutes.js';
import comentarioRouter from './routes/ComentarioRoutes.js';
import proyectoRouter, { proyectoController } from './routes/ProyectoRoutes.js';
import { usuarioController } from './routes/UsuarioRoutes.js';
import { validateToken } from './utils/token.util.js';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { NODE_ENV } from './utils/Enviroment.js';
import { usuarioMiddleware } from './middlewares/UsuarioMiddleware.js';

AppDataSource.initialize()
    .then(async () => {
        console.log('Database connected');

        const existeUsuario = await AppDataSource.getRepository(
            Usuario,
        ).existsBy({ id: 1 });

        if (!existeUsuario && NODE_ENV == 'Development') {
            await insertarUsuario();
            await insertarProyecto();
            await insertarRol();
            await insertarUsuarioProyecto();
        }
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // 100 intentos cada 15 min
    message:
        'Demasiadas solicitudes, intenta de nuevo más tarde, despues de 15 minutos.',
});

export const limiterSesion = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 20, // 20 intentos cada 15 min
    message:
        'Demasiadas solicitudes, intenta de nuevo más tarde, despues de 15 minutos.',
});

// Login de usuario
app.post('/usuario/login', limiterSesion, usuarioController.iniciarSesion);

app.use(limiter);

// Autenticacion de usuario
app.post('/usuario/create', usuarioController.crear);

app.use(validateToken);

app.get('/', (_req, res) => {
    res.send('API is running');
});

app.post('/proyecto/create', proyectoController.crear);

app.use('/usuario', usuarioRouter);
// Verifica si el usuario pertenece al proyecto que dice pertenecer
app.use(usuarioMiddleware.verifyExistenceOfUserInProject);
app.use('/rol', rolRouter);
app.use('/proyecto', proyectoRouter);
app.use('/tarea', tareaRouter);
app.use('/comentario', comentarioRouter);

const PORT = process.env.PORT ?? 3005;

app.listen(PORT, () => {
    console.log('Server is running on port 3005');
});
