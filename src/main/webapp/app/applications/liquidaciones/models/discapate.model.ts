import { BaseEntity } from './../../../shared';

export class Discapate implements BaseEntity {
    constructor(
        public id?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public atencion?: BaseEntity,
        public discap?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
