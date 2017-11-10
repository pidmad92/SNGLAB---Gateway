import { BaseEntity } from './../../shared';

export class Atenmotiaten implements BaseEntity {
    constructor(
        public id?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public atencion?: BaseEntity,
        public docpresentas?: BaseEntity[],
        public direcalter?: BaseEntity,
        public motatenofic?: BaseEntity,
    ) {
    }
}
