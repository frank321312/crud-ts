import { proyectoService } from '../services/ProyectoService.js';

export async function insertarProyecto() {
    const proyectos = [
        'Proyecto Aurora',
        'Iniciativa Horizonte',
        'Núcleo Alfa',
        'EcoRed',
        'Fénix Digital',
    ];

    for (let i = 0; i < proyectos.length; i++) {
        await proyectoService.crear(proyectos[i]!);
    }
}
