import { BaseEntity } from './../../shared';

export class Oficina implements BaseEntity {
    constructor(
        public id?: number,
        public vDesofic?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public abogados?: BaseEntity[],
        public atencions?: BaseEntity[],
        public motatenofics?: BaseEntity[],
        public pasegls?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
