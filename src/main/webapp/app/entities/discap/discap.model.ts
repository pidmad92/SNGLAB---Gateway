import { BaseEntity } from './../../shared';

export class Discap implements BaseEntity {
    constructor(
        public id?: number,
        public vDesdiscap?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public discapates?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
