import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { UsuarioProyecto } from './UsuarioProyecto.js';
import { Proyecto } from './Proyecto.js';

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    nombre: string;

    @OneToMany(() => UsuarioProyecto, (u) => u.rol)
    usuarioProyectos: Relation<UsuarioProyecto[]>;

    @ManyToOne(() => Proyecto, (p) => p.roles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_proyecto' })
    proyecto: Relation<Proyecto>;

    constructor(nombre: string, proyecto: Relation<Proyecto>) {
        this.nombre = nombre;
        this.proyecto = proyecto;
    }
}
