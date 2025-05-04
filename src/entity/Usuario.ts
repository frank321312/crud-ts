import { Entity, OneToMany } from 'typeorm';
import { UsuarioBase } from './classAbstract/UsuarioBase.js';
import { UsuarioProyecto } from './UsuarioProyecto.js';

@Entity()
export class Usuario extends UsuarioBase {
    @OneToMany(() => UsuarioProyecto, (up) => up.usuario)
    usuarioProyectos: UsuarioProyecto[];

    constructor(nombre: string, correoElectronico: string, contrasena: string) {
        super(nombre, correoElectronico, contrasena);
    }
}
