import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Fecha } from './Fecha.js';

export abstract class UsuarioBase extends Fecha {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30, unique: true })
    nombre: string;

    @Column({ type: 'varchar', length: 75, unique: true })
    correoElectronico: string;

    @Column({ type: 'varchar', length: 30 })
    contrasena: string;

    constructor(nombre: string, correoElectronico: string, contrasena: string) {
        super();
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.contrasena = contrasena;
    }
}
