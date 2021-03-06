import { BaseEntity } from './../../../shared';

export class Dirpernat implements BaseEntity {
    constructor(
        public id?: number,
        public nCoddepto?: number,
        public nCodprov?: number,
        public nCoddist?: number,
        public vDircomple?: string,
        public vReferen?: string,
        public nFlgnotifi?: boolean,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public pernatural?: BaseEntity,
    ) {
        this.nFlgnotifi = false;
        this.nFlgactivo = false;
    }
}
