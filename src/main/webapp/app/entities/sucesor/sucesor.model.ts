import { BaseEntity } from './../../shared';

export class Sucesor implements BaseEntity {
    constructor(
        public id?: number,
        public cFlgestado?: string,
        public vCodpartida?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public personanatur?: BaseEntity,
        public trabajador?: BaseEntity,
    ) {
    }
}
