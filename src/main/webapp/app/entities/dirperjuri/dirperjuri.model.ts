import { BaseEntity } from './../../shared';

export class Dirperjuri implements BaseEntity {
    constructor(
        public id?: number,
        public nCoddepto?: number,
        public nCodprov?: number,
        public nCoddist?: number,
        public vDircomple?: string,
        public vRefer?: string,
        public nFlgnotifi?: boolean,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public perjuridica?: BaseEntity,
    ) {
        this.nFlgnotifi = false;
        this.nFlgactivo = false;
    }
}
