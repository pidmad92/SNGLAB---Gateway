import { BaseEntity } from './../../shared';

export class Pasemotiaten implements BaseEntity {
    constructor(
        public id?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public pase?: BaseEntity,
        public motatenofic?: BaseEntity,
    ) {
    }
}
