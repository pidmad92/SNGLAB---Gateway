import { BaseEntity } from './../../shared';

export class Tipresoluc implements BaseEntity {
    constructor(
        public id?: number,
        public vDestipres?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public tipdiligencs?: BaseEntity[],
        public legtipdocs?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
