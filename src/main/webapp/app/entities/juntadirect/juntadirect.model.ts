import { BaseEntity } from './../../shared';

export class Juntadirect implements BaseEntity {
    constructor(
        public id?: number,
        public tFecinicio?: any,
        public tFecrfinal?: any,
        public nTitulares?: number,
        public nSuplentes?: number,
        public vEstado?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public organizacio?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
