import { BaseEntity } from './../../shared';

export class Participa implements BaseEntity {
    constructor(
        public id?: number,
        public nCodparti?: number,
        public nCodfperf?: number,
        public vNumdocum?: string,
        public vRazonsoc?: string,
        public vTipodoc?: string,
        public vTipopart?: string,
        public nPorcasig?: number,
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
