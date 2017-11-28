import { BaseEntity } from './../../shared';

export class Undnegocio implements BaseEntity {
    constructor(
        public id?: number,
        public nCodundng?: number,
        public nCodfperf?: number,
        public vDesundng?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public formperfil?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
