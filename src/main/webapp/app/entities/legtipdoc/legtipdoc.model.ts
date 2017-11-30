import { BaseEntity } from './../../shared';

export class Legtipdoc implements BaseEntity {
    constructor(
        public id?: number,
        public vCodreg?: string,
        public vCodzon?: string,
        public nCorrel?: number,
        public vCodsis?: string,
        public vAsundoc?: string,
        public dFecdoc?: any,
        public nMonpag?: number,
        public dFecentr?: any,
        public dFecdev?: any,
        public dFecrecjuz?: any,
        public vCodusureg?: string,
        public vHostreg?: string,
        public vCodusumod?: string,
        public dFecmod?: any,
        public vHostmod?: string,
        public dFeccit?: any,
        public vFlgfund?: string,
        public vFlgasis?: string,
        public nNumres?: number,
        public nMondol?: number,
        public vCodloc?: string,
        public vFlgconc?: string,
        public vDettdoc?: string,
        public dFecdocreq?: any,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public abogado?: BaseEntity,
        public legajo?: BaseEntity,
        public tipdocpj?: BaseEntity,
        public tipresoluc?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
