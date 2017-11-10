import { BaseEntity } from './../../shared';

export class Trabajador implements BaseEntity {
    constructor(
        public id?: number,
        public vNumdocumento?: string,
        public vFlgsucesor?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public expedientes?: BaseEntity[],
    ) {
    }
}
