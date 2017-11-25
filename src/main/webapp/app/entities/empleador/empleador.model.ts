import { BaseEntity } from './../../shared';

export class Empleador implements BaseEntity {
    constructor(
        public id?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public expedientes?: BaseEntity[],
        public datlabs?: BaseEntity[],
        public atencions?: BaseEntity[],
        public perjuridica?: BaseEntity,
        public pernatural?: BaseEntity,
        public tippersona?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
