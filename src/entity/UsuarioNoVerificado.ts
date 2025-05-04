import { Column, Entity } from 'typeorm';
import { UsuarioBase } from './classAbstract/UsuarioBase.js';

@Entity()
export class UsuarioNoVerificado extends UsuarioBase {
    @Column({ type: 'varchar', length: 6 })
    codigoDeVerificacion: string;

    constructor(
        nombre: string,
        correoElectronico: string,
        contrasena: string,
        codigoDeVerificacion: string,
    ) {
        super(nombre, correoElectronico, contrasena);
        this.codigoDeVerificacion = codigoDeVerificacion;
    }
}
