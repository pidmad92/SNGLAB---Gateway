import { BaseEntity } from './../../shared';

export class Direccion implements BaseEntity {
    constructor(
        public id?: number,
        public nCoddirec?: number,
        public nCodfperf?: number,
        public vDepart?: string,
        public vProvincia?: string,
        public vDistrito?: string,
        public vDireccion?: string,
        public vReferen?: string,
        public nNotifica?: boolean,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public formperfil?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
