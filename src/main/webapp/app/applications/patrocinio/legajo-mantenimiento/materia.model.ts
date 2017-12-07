 import { BaseEntity } from './';

export class Materia implements BaseEntity {
    constructor(
        public id?: number,
        public vDesmat?: string,
        public vAbrmat?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public legajos?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
