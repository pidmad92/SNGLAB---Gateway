import { BaseEntity } from '../../../shared';

export class Notifica implements BaseEntity {
    constructor(
        public id?: number,
        public nNumfolios?: number,
        public vHojaenvio?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public expediente?: BaseEntity,
        public direcnotifs?: BaseEntity[],
        public tipenvnot?: BaseEntity,
        public tipnotif?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
