import {
    Entity,
    JoinColumn,
    ManyToOne,
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

    @ManyToOne(() => Rol, (r) => r.usuarioProyectos, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_rol' })
    rol: Rol | null;

    @ManyToOne(() => Usuario, (u) => u.usuarioProyectos, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_usuario' })
    usuario: Relation<Usuario>;

    @ManyToOne(() => Proyecto, (p) => p.usuarioProyectos, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_proyecto' })
    proyecto: Relation<Proyecto>;

    constructor(
        usuario: Relation<Usuario>,
        proyecto: Relation<Proyecto>,
        rol: Rol,
    ) {
        this.usuario = usuario;
        this.proyecto = proyecto;
        this.rol = rol;
    }
}
