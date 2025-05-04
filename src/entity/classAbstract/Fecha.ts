import { Column, DeleteDateColumn } from 'typeorm';

export abstract class Fecha {
    @Column({ update: false })
    fechaDeCreacion: Date;

    @DeleteDateColumn({ nullable: true })
    fechaDeEliminacion: Date;

    constructor() {
        this.fechaDeCreacion = new Date();
    }
}
