import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET_KEY } from './Enviroment.js';

export const createToken = (object: any) => {
    return jwt.sign(object, String(JWT_SECRET_KEY), {
        expiresIn: 1000 * 60 * 60 * 5,
    });
};

export const getToken = (req: Request) =>
    req.headers.authorization!.split(' ')[1]!;

export const decodeToken = (token: string) => jwt.decode(token, { json: true });

export const getUserToken = (req: Request): any => decodeToken(getToken(req));

export const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).json({ message: 'Token invalido' });
            return;
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Token invalido' });
            return;
        }

        jwt.verify(token, String(process.env.JWT_SECRET_KEY));

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Token expirado', error: 1 });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(400).json({ message: 'Token invalido', error: 2 });
        } else {
            console.log(error);
            res.status(500).json({
                message: 'Error interno del servidor',
            });
        }
    }
};
