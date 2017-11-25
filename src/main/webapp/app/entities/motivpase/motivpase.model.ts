import { BaseEntity } from './../../shared';

export class Motivpase implements BaseEntity {
    constructor(
        public id?: number,
        public vObsmotpas?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public pasegl?: BaseEntity,
        public motatenofic?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
