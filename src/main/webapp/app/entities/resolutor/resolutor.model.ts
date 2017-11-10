import { BaseEntity } from './../../shared';

export class Resolutor implements BaseEntity {
    constructor(
        public id?: number,
        public vNomresolutor?: string,
        public nCodresolutorusuario?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public expedientes?: BaseEntity[],
    ) {
    }
}
