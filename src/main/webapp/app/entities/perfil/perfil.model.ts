import { BaseEntity } from './../../shared';

export class Perfil implements BaseEntity {
    constructor(
        public id?: number,
        public varNomPerfil?: string,
        public varDescPerfil?: string,
        public numEstPerfil?: number,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public modulo?: BaseEntity,
        public usuPers?: BaseEntity[],
        public menuPerfils?: BaseEntity[],
    ) {
    }
}
