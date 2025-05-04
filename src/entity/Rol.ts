import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { Proyecto } from './Proyecto.js';

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    nombre: string;

    @ManyToOne(() => Proyecto, (p) => p.roles)
    @JoinColumn({ name: 'id_proyecto' })
    proyecto: Relation<Proyecto>;

    constructor(nombre: string, proyecto: Relation<Proyecto>) {
        this.nombre = nombre;
        this.proyecto = proyecto;
    }
}
