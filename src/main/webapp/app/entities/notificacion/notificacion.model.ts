import { BaseEntity } from './../../shared';

export class Notificacion implements BaseEntity {
    constructor(
        public id?: number,
        public nNumfolios?: number,
        public vHojaenvio?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public expediente?: BaseEntity,
        public direcnotifs?: BaseEntity[],
        public tipenvnot?: BaseEntity,
        public tipnotif?: BaseEntity,
    ) {
    }
}
