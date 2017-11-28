import { BaseEntity } from './../../shared';

export class Solicform implements BaseEntity {
    constructor(
        public id?: number,
        public nCodsform?: number,
        public nCodsolic?: number,
        public nCodffina?: number,
        public nCodfarch?: number,
        public nCodfperf?: number,
        public vNomform?: string,
        public vTipoform?: string,
        public nFlgoblig?: boolean,
        public vFlgest?: string,
        public vObserva?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public formarchivo?: BaseEntity,
        public formfinanc?: BaseEntity,
        public formPerfil?: BaseEntity,
        public solicitud?: BaseEntity,
    ) {
        this.nFlgoblig = false;
        this.nFlgactivo = false;
    }
}
