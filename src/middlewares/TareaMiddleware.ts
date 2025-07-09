import { Request, Response, NextFunction } from 'express';
import { validatePropertiesOfTarea } from '../utils/util.js';

export class TareaMiddleware {
    isValidContent = (req: Request, res: Response, next: NextFunction) => {
        const { titulo, contenido } = req.body;

        const isValidTitle = validatePropertiesOfTarea(
            titulo,
            'titulo',
            10,
            50,
        );

        if (isValidTitle) {
            res.status(isValidTitle.status).json({
                message: isValidTitle.message,
            });
            return;
        }

        const isValidContent = validatePropertiesOfTarea(
            contenido,
            'contenido',
            20,
            1000,
        );

        if (isValidContent) {
            res.status(isValidContent.status).json({
                message: isValidContent.message,
            });
            return;
        }

        next();
    };
}

export const tareaMiddleware = new TareaMiddleware();
