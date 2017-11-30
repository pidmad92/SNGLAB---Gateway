import { BaseEntity } from './../../shared';

export class Afiliado implements BaseEntity {
    constructor(
        public id?: number,
        public vTipafilia?: string,
        public vEstado?: string,
        public nCodperson?: number,
        public nCodafilia?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public scargo?: BaseEntity,
        public organizacio?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
