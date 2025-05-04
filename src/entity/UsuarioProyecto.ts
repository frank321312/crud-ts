import {
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { Usuario } from './Usuario.js';
import { Proyecto } from './Proyecto.js';
import { Rol } from './Rol.js';

@Entity()
export class UsuarioProyecto {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Rol)
    @JoinColumn({ name: 'id_rol' })
    rol: Rol;

    @ManyToOne(() => Usuario, (u) => u.usuarioProyectos)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Relation<Usuario>;

    @ManyToOne(() => Proyecto, (p) => p.usuarioProyectos)
    @JoinColumn({ name: 'id_proyecto' })
    proyecto: Proyecto;

    constructor(usuario: Relation<Usuario>, proyecto: Proyecto, rol: Rol) {
        this.usuario = usuario;
        this.proyecto = proyecto;
        this.rol = rol;
    }
}
