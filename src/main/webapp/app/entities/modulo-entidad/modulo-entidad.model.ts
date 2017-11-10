import { BaseEntity } from './../../shared';

export class ModuloEntidad implements BaseEntity {
    constructor(
        public id?: number,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public modulo?: BaseEntity,
        public entidad?: BaseEntity,
    ) {
    }
}
