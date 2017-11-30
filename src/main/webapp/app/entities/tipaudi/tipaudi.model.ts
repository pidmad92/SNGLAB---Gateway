import { BaseEntity } from './../../shared';

export class Tipaudi implements BaseEntity {
    constructor(
        public id?: number,
        public vCodsis?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public tipdiligenc?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
