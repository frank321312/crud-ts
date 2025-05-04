import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Fecha } from './classAbstract/Fecha.js';
import { UsuarioProyecto } from './UsuarioProyecto.js';
import { Rol } from './Rol.js';

@Entity()
export class Proyecto extends Fecha {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30, unique: true })
    nombre: string;

    @OneToMany(() => UsuarioProyecto, (up) => up.proyecto)
    usuarioProyectos: UsuarioProyecto[];

    @OneToMany(() => Rol, (r) => r.proyecto)
    roles: Rol[];

    constructor(nombre: string) {
        super();
        this.nombre = nombre;
    }
}
