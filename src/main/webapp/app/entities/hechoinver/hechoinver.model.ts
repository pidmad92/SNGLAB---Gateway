import { BaseEntity } from './../../shared';

export class Hechoinver implements BaseEntity {
    constructor(
        public id?: number,
        public nCodhinve?: number,
        public nCodfperf?: number,
        public vDeshinve?: string,
        public vTipohinv?: string,
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
