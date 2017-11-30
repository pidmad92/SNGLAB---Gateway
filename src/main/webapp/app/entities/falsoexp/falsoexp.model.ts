import { BaseEntity } from './../../shared';

export class Falsoexp implements BaseEntity {
    constructor(
        public id?: number,
        public vCodreg?: string,
        public vCargofal?: string,
        public vDemndte?: string,
        public vDemandado?: string,
        public vDnidmdo?: string,
        public vDnidmte?: string,
        public vNombres?: string,
        public vDiffal?: string,
        public vDoctor?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
    ) {
        this.nFlgactivo = false;
    }
}
