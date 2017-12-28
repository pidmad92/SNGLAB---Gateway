import { BaseEntity } from '../../../shared';

export class Motate implements BaseEntity {
    constructor(
        public id?: number,
        public vDesmotate?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public motatenofics?: BaseEntity[],
        public tipmotaten?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
