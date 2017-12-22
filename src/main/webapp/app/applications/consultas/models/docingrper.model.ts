import { BaseEntity } from '../../../shared';

export class Docingrper implements BaseEntity {
    constructor(
        public id?: number,
        public vDesdocing?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public docinperdlbs?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
