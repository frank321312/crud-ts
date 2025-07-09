import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { Comentario } from './Comentario.js';
import { Usuario } from './Usuario.js';
import { Proyecto } from './Proyecto.js';

@Entity()
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    titulo: string;

    @Column({ type: 'varchar', length: 1000 })
    contenido: string;

    @Column({ update: false })
    fechaDeCreacion: Date;

    @Column({ nullable: true })
    fechaDeFinalizacion: Date;

    @OneToMany(() => Comentario, (c) => c.tarea)
    comentarios: Relation<Comentario[]>;

    @ManyToOne(() => Usuario, (u) => u.tareasCreadas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usuario_creador' })
    usuarioCreador: Relation<Usuario>;

    @ManyToOne(() => Usuario, (u) => u.tareasAsignadas, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'id_usuario_asignado' })
    usuarioAsignado: Relation<Usuario> | null;

    @ManyToOne(() => Proyecto, (p) => p.tareas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_proyecto' })
    proyecto: Relation<Proyecto>;

    constructor(
        titulo: string,
        contenido: string,
        usuarioAsignado: Relation<Usuario>,
        usuarioCreador: Relation<Usuario>,
        proyecto: Relation<Proyecto>,
    ) {
        this.fechaDeCreacion = new Date();
        this.titulo = titulo;
        this.contenido = contenido;
        this.usuarioAsignado = usuarioAsignado;
        this.usuarioCreador = usuarioCreador;
        this.proyecto = proyecto;
    }
}
