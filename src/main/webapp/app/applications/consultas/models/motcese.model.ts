import { BaseEntity } from './../../../shared';

export class Motcese implements BaseEntity {
    constructor(
        public id?: number,
        public vDesmotces?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public datlabs?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
