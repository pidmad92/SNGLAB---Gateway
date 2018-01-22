import { BaseEntity } from '../../../shared';

export class Expediente implements BaseEntity {
    constructor(
        public id?: number,
        public vNumexp?: string,
        public nAnioexp?: number,
        public dFecregexp?: any,
        public vNomemplea?: string,
        public vNomtrabaj?: string,
        public nFlgexpobs?: boolean,
        public vRegmespar?: string,
        public dFecmespar?: any,
        public vObservac?: string,
        public nFlgarchiv?: boolean,
        public dFecArchiv?: any,
        public vObsarchiv?: string,
        public nCodusuarc?: number,
        public vNuminfarc?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public empleador?: BaseEntity,
        public tippersona?: BaseEntity,
        public trabajador?: BaseEntity,
        public pasegl?: BaseEntity,
        public concilias?: BaseEntity[],
        public docexpediens?: BaseEntity[],
        public resolucrds?: BaseEntity[],
        public notificas?: BaseEntity[],
        public estexpedien?: BaseEntity,
        public resolutor?: BaseEntity,
        public trabajadorDireccion?: any,
        public empleadorDireccion?: any,
        public tipoNotificacion?: any,
        public tipoEnvio?: any,
        public nroFolios?: any
    ) {
        this.nFlgexpobs = false;
        this.nFlgarchiv = false;
        this.nFlgactivo = false;
    }
}
