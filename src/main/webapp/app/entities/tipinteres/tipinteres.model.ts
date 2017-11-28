import { BaseEntity } from './../../shared';

export class Tipinteres implements BaseEntity {
    constructor(
        public id?: number,
        public vNomtipint?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public interesperis?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
