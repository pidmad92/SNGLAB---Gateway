import { BaseEntity } from './../../shared';

export class Aplicacion implements BaseEntity {
    constructor(
        public id?: number,
        public varNomApp?: string,
        public varDescApp?: string,
        public varUrlApp?: string,
        public numEstApp?: number,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public modulos?: BaseEntity[],
    ) {
    }
}
