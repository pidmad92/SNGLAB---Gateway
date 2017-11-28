import { BaseEntity } from './../../shared';

export class Tipdocident implements BaseEntity {
    constructor(
        public id?: number,
        public vDesdocide?: string,
        public nNumdigi?: number,
        public vDescorta?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public pernaturals?: BaseEntity[],
        public perjuridicas?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
