import { BaseEntity } from './../../shared';

export class Calrcmperi implements BaseEntity {
    constructor(
        public id?: number,
        public nCalrcmper?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public conceprems?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
