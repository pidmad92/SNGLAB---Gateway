import { BaseEntity } from './../../shared';

export class Pasegl implements BaseEntity {
    constructor(
        public id?: number,
        public vObspase?: string,
        public vEstado?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public oficina?: BaseEntity,
        public atencion?: BaseEntity,
        public legajos?: BaseEntity[],
        public motivpases?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
