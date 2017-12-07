import { BaseEntity } from './../../shared';

export class Pernatural implements BaseEntity {
    constructor(
        public id?: number,
        public vNombres?: string,
        public vApepat?: string,
        public vApemat?: string,
        public vNumdoc?: string,
        public vTelefono?: string,
        public vCelular?: string,
        public vEmailper?: string,
        public dFecnac?: any,
        public vSexoper?: string,
        public vEstado?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public denuntes?: BaseEntity[],
        public dirpernats?: BaseEntity[],
        public empleadors?: BaseEntity[],
        public trabajadors?: BaseEntity[],
        public sucesors?: BaseEntity[],
        public tipdocident?: BaseEntity,
        // Agregado para validacion de denuncias
        public Resultado?: Boolean,
        public genero?: string,
        public estadoCivil?: string,
        public coddep?: string,
        public codpro?: string,
        public coddist?: string,
        public direccion?: string,
        public dirdenun?: BaseEntity,
        public fecNacimiento?: string
    ) {
        this.nFlgactivo = false;
    }
}
