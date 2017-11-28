import { BaseEntity } from './../../shared';

export class Tippersona implements BaseEntity {
    constructor(
        public id?: number,
        public vDestipper?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public expedientes?: BaseEntity[],
        public resolucrds?: BaseEntity[],
        public empleadors?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
