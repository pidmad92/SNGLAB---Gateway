import { BaseEntity } from '../../../shared';

export class Trabajador implements BaseEntity {
    constructor(
        public id?: number,
        public nFlgsuces?: boolean,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public cartrab?: BaseEntity,
        public pernatural?: BaseEntity,
        public expedientes?: BaseEntity[],
        public datlabs?: BaseEntity[],
        public atencions?: BaseEntity[],
        public sucesors?: BaseEntity[],
    ) {
        this.nFlgsuces = false;
        this.nFlgactivo = false;
    }
}
