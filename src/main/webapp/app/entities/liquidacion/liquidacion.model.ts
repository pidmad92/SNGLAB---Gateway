import { BaseEntity } from './../../shared';

export class Liquidacion implements BaseEntity {
    constructor(
        public id?: number,
        public nLiquid?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public calbensocs?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
