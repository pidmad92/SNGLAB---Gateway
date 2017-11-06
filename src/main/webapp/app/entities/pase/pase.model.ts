import { BaseEntity } from './../../shared';

export class Pase implements BaseEntity {
    constructor(
        public id?: number,
        public vObservacion?: string,
        public cFlgestado?: string,
        public nCodoficinaorigen?: number,
        public nCodoficinadestino?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public pasemotiatens?: BaseEntity[],
        public atencion?: BaseEntity,
    ) {
    }
}
