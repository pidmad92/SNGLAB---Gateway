import { BaseEntity } from './../../shared';

export class Negocolect implements BaseEntity {
    constructor(
        public id?: number,
        public nCodngcol?: number,
        public nCodfperf?: number,
        public vAmbsubje?: string,
        public vTipongco?: string,
        public vEtapaneg?: string,
        public tFecvigde?: any,
        public tFecvigha?: any,
        public vNumexpe?: string,
        public vAuttrab?: string,
        public vRucneg?: string,
        public vRegistro?: string,
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
