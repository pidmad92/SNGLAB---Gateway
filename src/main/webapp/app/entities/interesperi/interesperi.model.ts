import { BaseEntity } from './../../shared';

export class Interesperi implements BaseEntity {
    constructor(
        public id?: number,
        public nValintper?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public tipinteres?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
