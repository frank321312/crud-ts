import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { UsuarioProyecto } from './UsuarioProyecto.js';
import { Comentario } from './Comentario.js';
import { Tarea } from './Tarea.js';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('IDX_NOMBRE_UNIQUE', { unique: true })
    @Column({ type: 'varchar', length: 30 })
    nombreUsuario: string;

    @Column({ type: 'varchar', length: 30 })
    nombre: string;

    @Column({ type: 'varchar', length: 30 })
    apellido: string;

    @Index('IDX_EMAIL_UNIQUE', { unique: true })
    @Column({ type: 'varchar', length: 75 })
    correoElectronico: string;

    @Column({ type: 'varchar', length: 60 })
    contrasena: string;

    @Column({ update: false })
    fechaDeCreacion: Date;

    @Column({ type: 'datetime', nullable: true })
    completado: Date;

    @Column({ default: false })
    validado: boolean;

    @OneToMany(() => UsuarioProyecto, (up) => up.usuario)
    usuarioProyectos: UsuarioProyecto[];

    @OneToMany(() => Comentario, (c) => c.usuario)
    comentarios: Relation<Comentario[]>;

    @OneToMany(() => Tarea, (t) => t.usuarioCreador)
    tareasCreadas: Relation<Tarea[]>;

    @OneToMany(() => Tarea, (t) => t.usuarioAsignado)
    tareasAsignadas: Relation<Tarea[]>;

    constructor(
        nombreUsuario: string,
        nombre: string,
        apellido: string,
        correoElectronico: string,
        contrasena: string,
    ) {
        this.fechaDeCreacion = new Date();
        this.nombreUsuario = nombreUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correoElectronico = correoElectronico;
        this.contrasena = contrasena;
    }
}
