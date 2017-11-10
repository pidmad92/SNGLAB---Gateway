import { BaseEntity } from './../../shared';

export class Motatenofic implements BaseEntity {
    constructor(
        public id?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public motivoatenci?: BaseEntity,
        public oficina?: BaseEntity,
        public atenmotiatens?: BaseEntity[],
        public pasemotiatens?: BaseEntity[],
    ) {
    }
}
