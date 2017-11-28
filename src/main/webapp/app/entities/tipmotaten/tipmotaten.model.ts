import { BaseEntity } from './../../shared';

export class Tipmotaten implements BaseEntity {
    constructor(
        public id?: number,
        public vDestipmot?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public motates?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
