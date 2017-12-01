import { BaseEntity } from './../../shared';

export class Respinforma implements BaseEntity {
    constructor(
        public id?: number,
        public nCodrinfo?: number,
        public nCodfperf?: number,
        public vTipores?: string,
        public vNumdocum?: string,
        public vNombre?: string,
        public vCargores?: string,
        public vEmailres?: string,
        public vTelefono?: string,
        public vCelular?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public formperfil?: BaseEntity,
    ) {
        this.vNumdocum = '';
        this.vNombre = '';
        this.vCargores = '';
        this.vEmailres = '';
        this.vTelefono = '';
        this.vCelular = '';
        this.nFlgactivo = true;
    }
}
