import { BaseEntity } from './../../shared';

export class Modulo implements BaseEntity {
    constructor(
        public id?: number,
        public varNomModulo?: string,
        public varDescModulo?: string,
        public numEstModulo?: number,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public aplicacion?: BaseEntity,
        public moduloEntidads?: BaseEntity[],
        public menus?: BaseEntity[],
        public perfils?: BaseEntity[],
    ) {
    }
}
