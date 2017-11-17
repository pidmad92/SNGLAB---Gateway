import { BaseEntity } from './../../shared';

export class Pase implements BaseEntity {
    constructor(
        public id?: number,
        public vObservacion?: string,
        public cFlgestado?: string,
        public nCodoficinadestino?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public expediente?: BaseEntity,
        public pasemotiatens?: BaseEntity[],
        public atencion?: BaseEntity,
    ) {
    }
}
