import { BaseEntity } from './../../shared';

export class Abogado implements BaseEntity {
    constructor(
        public id?: number,
        public vNomabogado?: string,
        public nCodabogadousuario?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public oficina?: BaseEntity,
        public conciliacions?: BaseEntity[],
    ) {
    }
}
