import { BaseEntity } from './../../shared';

export class Librosindic implements BaseEntity {
    constructor(
        public id?: number,
        public vNumreglib?: string,
        public vNumlibsin?: string,
        public tFecresolu?: any,
        public vUsuregist?: string,
        public vEstado?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public tipolibro?: BaseEntity,
        public organizacio?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
