import {
    EventSubscriber,
    type EntitySubscriberInterface,
    type SoftRemoveEvent,
} from 'typeorm';
import { Usuario } from '../entity/Usuario.js';

@EventSubscriber()
export class UsuarioSubscriber implements EntitySubscriberInterface<Usuario> {
    listenTo() {
        return Usuario;
    }

    async afterSoftRemove(event: SoftRemoveEvent<Usuario>) {
        if (event.entity != undefined) {
            await event.manager
                .createQueryBuilder()
                .update(Usuario)
                .set({ fechaDeEliminacion: new Date() })
                .where('idUsuario = :id', { id: event.entity.id })
                .execute();
        }
    }
}
