import { BaseEntity } from './../../shared';

export class Solicitud implements BaseEntity {
    constructor(
        public id?: number,
        public nCodsolic?: number,
        public nCodrepre?: number,
        public tFecsolic?: any,
        public tFecenvio?: any,
        public vFlgest?: string,
        public vSolicita?: string,
        public vEmpleador?: string,
        public vSindicato?: string,
        public vArbitro?: string,
        public vCodsolic?: string,
        public vCodemple?: string,
        public vCodsindi?: string,
        public vCodarbit?: string,
        public tFecvigde?: any,
        public tFecvigha?: any,
        public vVoucher?: string,
        public vRegistro?: string,
        public vRucsol?: string,
        public vCodusu?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public reporteRes?: BaseEntity,
        public solFormularios?: BaseEntity[],
        public usuSolicitud?: BaseEntity[],
        public vNombres?: string,
    ) {
        this.nFlgactivo = false;
    }
}
