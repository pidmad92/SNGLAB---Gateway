import { BaseEntity } from './../../shared';

export class Resulconci implements BaseEntity {
    constructor(
        public id?: number,
        public vDescripcion?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public conciliacions?: BaseEntity[],
        public tipresconc?: BaseEntity,
    ) {
    }
}
