import { BaseEntity } from './../../shared';

export class Recurso implements BaseEntity {
    constructor(
        public id?: number,
        public vNumrecurs?: string,
        public tFecrecurs?: any,
        public vEstado?: string,
        public tFecprovei?: any,
        public vObsrecurs?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public tiporecurso?: BaseEntity,
        public organizacio?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
