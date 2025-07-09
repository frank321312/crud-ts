import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { Tarea } from './Tarea.js';
import { Usuario } from './Usuario.js';

@Entity()
export class Comentario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 500 })
    contenido: string;

    @Column({ update: false })
    fechaDeCreacion: Date;

    @Column()
    editado: boolean;

    @ManyToOne(() => Tarea, (t) => t.comentarios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_tarea' })
    tarea: Relation<Tarea>;

    @ManyToOne(() => Usuario, (u) => u.comentarios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usuario' })
    usuario: Relation<Usuario>;

    constructor(
        contenido: string,
        tarea: Relation<Tarea>,
        usuario: Relation<Usuario>,
    ) {
        this.contenido = contenido;
        this.tarea = tarea;
        this.usuario = usuario;
        this.fechaDeCreacion = new Date();
        this.editado = false;
    }
}
