import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ERol } from '../enums/ERol.js';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    idUsuario: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ERol, default: ERol.USER })
    rol: ERol;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;
}
