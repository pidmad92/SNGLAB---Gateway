import { BaseEntity } from './../../shared';

export class Dettipprov implements BaseEntity {
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
        public docexpediens?: BaseEntity[],
        public tipproveid?: BaseEntity,
    ) {
    }
}
