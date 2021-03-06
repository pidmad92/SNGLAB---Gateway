import { BaseEntity } from './../../shared';

export class Pasepj implements BaseEntity {
    constructor(
        public id?: number,
        public vCodreg?: string,
        public vCodzon?: string,
        public vCodtdcide?: string,
        public nCorrel?: number,
        public vCodsis?: string,
        public nCodsuc?: number,
        public vCodcon?: string,
        public dFecpas?: any,
        public dFecrecep?: any,
        public vCodusurec?: string,
        public vCodusureg?: string,
        public vHostreg?: string,
        public vCodusumod?: string,
        public dFecmod?: any,
        public vHostmod?: string,
        public vCodsisdes?: string,
        public dFecdes?: any,
        public dFeccon?: any,
        public vCodtrar?: string,
        public vCodtdcidr?: string,
        public nCorrelr?: number,
        public vObspas?: string,
        public vCodtrac?: string,
        public vCodtdcidi?: string,
        public nCorrelc?: number,
        public vCodloc?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public empleador?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
