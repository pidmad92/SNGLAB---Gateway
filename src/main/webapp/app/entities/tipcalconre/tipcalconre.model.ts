import { BaseEntity } from './../../shared';

export class Tipcalconre implements BaseEntity {
    constructor(
        public id?: number,
        public vNomtcal?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public conceprems?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
