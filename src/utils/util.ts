import { ZodError } from 'zod';

// Si es true, el id no es valido, si es false, el id es valido
export const isValidId = (id: any) => isNaN(Number(id)) || !id;

export const messageSpaceError = (digit: number) =>
    `No debe contener mas ${digit} espacios o preceder de otro`;

export const responseZodError = (error: ZodError) => {
    const errorZod = error as ZodError;
    return {
        message: errorZod.errors[0]!.message,
        path: errorZod.errors[0]!.path[0],
    };
};

const transformFirstCharacterToUpperCase = (word: string) => {
    const restWord = word.slice(1);
    return word[0]!.toUpperCase() + restWord;
};

export const validatePropertiesOfTarea = (
    field: any,
    fieldName: string,
    minCharacters: number,
    maxCharacters: number,
) => {
    if (!field) {
        return {
            status: 400,
            message: `${transformFirstCharacterToUpperCase(fieldName)} requerido`,
        };
    } else if (typeof field != 'string') {
        return { status: 400, message: `El ${fieldName} debe ser un string` };
    } else if (field.length < minCharacters) {
        return { status: 422, message: `Minimo ${minCharacters} caracteres` };
    } else if (field.length > maxCharacters) {
        return { status: 422, message: `Maximo ${maxCharacters} caracteres` };
    }
    return null;
};
