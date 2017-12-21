import { BaseEntity } from './../../shared';

export class Anexlaboral implements BaseEntity {
    constructor(
        public id?: number,
        public nCodanexo?: number,
        public nCodfperf?: number,
        public nAnioanex?: number,
        public vTipocont?: string,
        public vDeclegal?: string,
        public vDesanexo?: string,
        public nCantlabo?: number,
        public vComponen?: string,
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
