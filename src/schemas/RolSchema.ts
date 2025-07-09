import { schemaCadena, validateSpace } from './UsuarioSchema.js';
import { messageSpaceError } from '../utils/util.js';

export const schemaRol = schemaCadena
    .refine((r) => validateSpace(r, 4), messageSpaceError(4))
    .transform((r) => r.trim());
