import { BaseEntity } from './../../shared';

export class Tipproveid implements BaseEntity {
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
        public tipdocexp?: BaseEntity,
        public dettipprovs?: BaseEntity[],
        public docexpediens?: BaseEntity[],
    ) {
    }
}
