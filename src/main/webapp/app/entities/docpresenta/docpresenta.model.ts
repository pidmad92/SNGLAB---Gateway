import { BaseEntity } from './../../shared';

export class Docpresenta implements BaseEntity {
    constructor(
        public id?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public atenmotiaten?: BaseEntity,
        public documento?: BaseEntity,
    ) {
    }
}
