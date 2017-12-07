import { BaseEntity } from './../../shared';

export class Negocolect implements BaseEntity {
    constructor(
        public id?: number,
        public vRazonsoc?: string,
        public nCodngcol?: number,
        public nCodfperf?: number,
        public vAmbsubje?: string,
        public vCodAmbsu?: string,
        public vTipongco?: string,
        public vEtapaneg?: string,
        public vCodEtapa?: string,
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
        this.vRazonsoc = '';
        this.vAmbsubje = '';
        this.vTipongco = '';
        this.vEtapaneg = '';
        this.tFecvigde = '';
        this.tFecvigha = '';
        this.vNumexpe = '';
        this.vAuttrab = '';
        this.vRucneg = '';
        this.vRegistro = '';
        this.vUsuareg = '';
        this.tFecreg = '';
        this.vCodAmbsu = '';
        this.vCodEtapa = '';
        this.nFlgactivo = true;
    }
}
