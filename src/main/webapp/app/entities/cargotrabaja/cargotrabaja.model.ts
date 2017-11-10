import { BaseEntity } from './../../shared';

export class Cargotrabaja implements BaseEntity {
    constructor(
        public id?: number,
        public vDescargotrabaja?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public trabajadors?: BaseEntity[],
    ) {
    }
}
