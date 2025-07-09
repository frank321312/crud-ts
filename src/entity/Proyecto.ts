import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { UsuarioProyecto } from './UsuarioProyecto.js';
import { Rol } from './Rol.js';
import { Tarea } from './Tarea.js';

@Entity()
export class Proyecto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    nombre: string;

    @Column({ type: 'datetime', nullable: true })
    completado: Date;

    @Column({ update: false })
    fechaDeCreacion: Date;

    @Column({ nullable: true })
    fechaDeFinalizacion: Date;

    @OneToMany(() => Rol, (r) => r.proyecto)
    roles: Relation<Rol[]>;

    @OneToMany(() => UsuarioProyecto, (up) => up.proyecto)
    usuarioProyectos: UsuarioProyecto[];

    @OneToMany(() => Tarea, (t) => t.proyecto)
    tareas: Relation<Tarea>;

    constructor(nombre: string) {
        this.fechaDeCreacion = new Date();
        this.nombre = nombre;
    }
}
