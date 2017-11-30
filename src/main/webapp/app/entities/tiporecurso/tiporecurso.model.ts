import { BaseEntity } from './../../shared';

export class Tiporecurso implements BaseEntity {
    constructor(
        public id?: number,
        public vDestrecur?: string,
        public vEstado?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public recursos?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
