import { BaseEntity } from './../../shared';

export class Cartrab implements BaseEntity {
    constructor(
        public id?: number,
        public vDesCartra?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public trabajadors?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
