import { BaseEntity } from './../../shared';

export class Legajoasig implements BaseEntity {
    constructor(
        public id?: number,
        public vCodreg?: string,
        public vCodzon?: string,
        public nCorrel?: number,
        public dFecasig?: any,
        public vHostreg?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public abogado?: BaseEntity,
        public legajo?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
