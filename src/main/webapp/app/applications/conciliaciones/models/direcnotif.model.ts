import { BaseEntity } from '../../../shared';

export class Direcnotif implements BaseEntity {
    constructor(
        public id?: number,
        public vDireccion?: string,
        public nflgtrabaj?: boolean,
        public vHojaenvio?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public notifica?: BaseEntity,
    ) {
        this.nflgtrabaj = false;
        this.nFlgactivo = false;
    }
}
