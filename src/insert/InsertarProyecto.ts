import { AppDataSource } from '../data-source.js';
import { Proyecto } from '../entity/Proyecto.js';

export async function insertarProyecto() {
    const proyectos = [
        'Proyecto Aurora',
        'Iniciativa Horizonte',
        'Núcleo Alfa',
        'EcoRed',
        'Fénix Digital',
        'Órbita Cero',
        'Atlas Verde',
        'Neón Inteligente',
        'Código Raíz',
        'Visión Prisma',
    ];

    for (const nombre of proyectos) {
        const proyecto = new Proyecto(nombre);
        await AppDataSource.manager.save(proyecto);
    }
}
