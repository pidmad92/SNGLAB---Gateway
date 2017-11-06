import { BaseEntity } from './../../shared';

export class UsuarioGrupo implements BaseEntity {
    constructor(
        public id?: number,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public usuario?: BaseEntity,
        public usuPers?: BaseEntity[],
        public grupo?: BaseEntity,
    ) {
    }
}
