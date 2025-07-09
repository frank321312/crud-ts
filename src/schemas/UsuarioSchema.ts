import z from 'zod';
import { messageSpaceError } from '../utils/util.js';

const abecedario = 'zxcvbnmasdfghjklñpoiuytrewqáéíóú ';

export const stringMinMax = (min: number, max: number) =>
    z
        .string({ required_error: 'Requerido' })
        .min(3, `Minimo ${min} caracteres`)
        .max(30, `maximo ${max} caracteres`);

export const schemaCadena = stringMinMax(3, 30).refine((cadena) => {
    for (const caracter of cadena) {
        if (
            abecedario.includes(caracter) === false &&
            abecedario.toUpperCase().includes(caracter) === false
        ) {
            return false;
        }
    }

    return true;
}, 'Debe ser alfabetico');

export const validateSpace = (cadena: string, limit: number) => {
    let listCadena = Array.from(cadena);
    const count = listCadena.filter((x) => x == ' ').length;

    if (count > limit) {
        return false;
    }

    let validate = true;

    while (validate) {
        const indexChar = listCadena.indexOf(' ');

        if (indexChar == -1) {
            break;
        } else if (listCadena[indexChar + 1] == ' ') {
            validate = false;
            break;
        }

        listCadena = listCadena.slice(indexChar + 1);
    }

    return validate;
};

const validarContrasena = (pass: string) => {
    const numeros = Array.from({ length: 9 }, (_, i) => String(i + 1));
    numeros.push('0');
    return (
        numeros.some((x) => pass.includes(x)) &&
        abecedario.split('').some((x) => pass.includes(x)) &&
        abecedario
            .toUpperCase()
            .split('')
            .some((x) => pass.includes(x)) &&
        !pass.includes(' ')
    );
};

export const schemaContrasena = stringMinMax(8, 20).refine(
    (pass) => validarContrasena(pass),
    'Contraseña invalida',
);

export const schemaEmail = z
    .string({ required_error: 'Requerido' })
    .email('Email invalido');

export const schemaUsuario = z.object({
    nombreUsuario: stringMinMax(3, 30)
        .refine((n) => validateSpace(n, 4), messageSpaceError(4))
        .transform((n) => n.trim()),
    nombre: schemaCadena
        .refine((n) => validateSpace(n, 2), messageSpaceError(2))
        .transform((n) => n.trim()),
    apellido: schemaCadena
        .refine((a) => validateSpace(a, 2), messageSpaceError(1))
        .transform((a) => a.trim()),
    correoElectronico: schemaEmail,
    contrasena: schemaContrasena,
});

export type SchemaUsuario = z.infer<typeof schemaUsuario>;
