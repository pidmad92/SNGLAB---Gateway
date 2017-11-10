import { BaseEntity } from './../../shared';

export class Menu implements BaseEntity {
    constructor(
        public id?: number,
        public varNomMenu?: string,
        public numOrdenItem?: number,
        public varUrlMenu?: string,
        public numOpcion?: number,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public modulo?: BaseEntity,
        public menu?: BaseEntity,
        public menus?: BaseEntity[],
        public menuPerfils?: BaseEntity[],
    ) {
    }
}
