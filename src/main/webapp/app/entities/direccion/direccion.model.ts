import { BaseEntity } from './../../shared';

export class Direccion implements BaseEntity {
    constructor(
        public id?: number,
        public nCoddirec?: number,
        public nCodfperf?: number,
        public vDepart?: string,
        public vProvincia?: string,
        public vDistrito?: string,
        public vCodDepa?: string,
        public vCodProv?: string,
        public vCodDist?: string,
        public vDireccion?: string,
        public vReferen?: string,
        public nNotifica?: number,
        public bNotifica?: boolean,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public formperfil?: BaseEntity,
    ) {
        this.vDepart = '';
        this.vProvincia = '';
        this.vDistrito = '';
        this.vCodDepa = '';
        this.vCodProv = '';
        this.vCodDist = '';
        this.vDireccion = '';
        this.vReferen = '';
        this.nNotifica = 0;
        this.bNotifica = false;
        this.nFlgactivo = true;
    }
}
