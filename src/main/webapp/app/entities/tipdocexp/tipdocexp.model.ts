import { BaseEntity } from './../../shared';

export class Tipdocexp implements BaseEntity {
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
        public tipproveids?: BaseEntity[],
        public docexpediens?: BaseEntity[],
    ) {
    }
}
