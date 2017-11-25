import { BaseEntity } from './../../shared';

export class Actiecon implements BaseEntity {
    constructor(
        public id?: number,
        public vCiuuaceco?: string,
        public vDesacteco?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public perjuridicas?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
