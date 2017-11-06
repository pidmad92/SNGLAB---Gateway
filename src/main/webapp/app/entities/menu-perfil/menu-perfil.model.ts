import { BaseEntity } from './../../shared';

export class MenuPerfil implements BaseEntity {
    constructor(
        public id?: number,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public perfil?: BaseEntity,
        public menu?: BaseEntity,
    ) {
    }
}
