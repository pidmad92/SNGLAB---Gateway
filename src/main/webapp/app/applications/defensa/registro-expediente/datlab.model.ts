import { BaseEntity } from './../../../shared';

export class Datlab implements BaseEntity {
    constructor(
        public id?: number,
        public nFlgsitlab?: boolean,
        public dFecvincul?: any,
        public dFeccese?: any,
        public dFecfincon?: any,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public docinperdlbs?: BaseEntity[],
        public atencions?: BaseEntity[],
        public empleador?: BaseEntity,
        public modcontrato?: BaseEntity,
        public motcese?: BaseEntity,
        public regimenlab?: BaseEntity,
        public trabajador?: BaseEntity,
        public tipvinculo?: BaseEntity,
    ) {
        this.nFlgsitlab = false;
        this.nFlgactivo = false;
    }
}
