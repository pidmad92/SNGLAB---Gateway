import { BaseEntity } from './../../shared';

export class Tipdocpj implements BaseEntity {
    constructor(
        public id?: number,
        public vCodsis?: string,
        public vDestdoc?: string,
        public vFlgtip?: string,
        public vFlgres?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public legtipdocs?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
