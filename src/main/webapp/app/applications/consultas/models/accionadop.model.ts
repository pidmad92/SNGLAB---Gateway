import { BaseEntity } from '../../../shared';

export class Accionadop implements BaseEntity {
    constructor(
        public id?: number,
        public vDesaccdop?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public accadoates?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
