import { BaseEntity } from './../../shared';

export class Motivoatenci implements BaseEntity {
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
        public motatenofics?: BaseEntity[],
        public tipmotaten?: BaseEntity,
    ) {
    }
}
