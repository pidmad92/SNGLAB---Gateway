import { BaseEntity } from './../../shared';

export class Atencionpj implements BaseEntity {
    constructor(
        public id?: number,
        public vCodreg?: string,
        public vCodzon?: string,
        public nCorrel?: number,
        public dFecaten?: any,
        public vObsaten?: string,
        public vFlgtel?: string,
        public vFlgadm?: string,
        public vFlgtelr?: string,
        public vFlgaten?: string,
        public vCodloc?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public legajo?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
