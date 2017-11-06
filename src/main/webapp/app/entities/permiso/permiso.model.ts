import { BaseEntity } from './../../shared';

export class Permiso implements BaseEntity {
    constructor(
        public id?: number,
        public varNomPermiso?: string,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public usuPers?: BaseEntity[],
    ) {
    }
}
