import { stringMinMax, validateSpace } from './UsuarioSchema.js';
import { messageSpaceError } from '../utils/util.js';

export const proyectoSchema = stringMinMax(3, 30)
    .refine((n) => validateSpace(n, 4), messageSpaceError(4))
    .transform((n) => n.trim());
