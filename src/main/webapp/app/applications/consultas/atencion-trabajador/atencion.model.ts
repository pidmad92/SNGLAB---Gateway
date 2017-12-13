import { BaseEntity } from './../../../shared';

export class Atencion implements BaseEntity {
    constructor(
        public id?: number,
        public vObsatenci?: string,
        public nFlgembara?: boolean,
        public vEstado?: string,
        public vNumticket?: string,
        public nCodtrepre?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public liquidacion?: BaseEntity,
        public discapates?: BaseEntity[],
        public docpresates?: BaseEntity[],
        public accadoates?: BaseEntity[],
        public motateselecs?: BaseEntity[],
        public datlab?: BaseEntity,
        public empleador?: BaseEntity,
        public oficina?: BaseEntity,
        public tipatencion?: BaseEntity,
        public trabajador?: BaseEntity,
    ) {
        this.nFlgembara = false;
        this.nFlgactivo = false;
    }
}
