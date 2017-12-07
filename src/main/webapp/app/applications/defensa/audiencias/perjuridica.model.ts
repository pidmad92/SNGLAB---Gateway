import { BaseEntity } from './../../../shared';

export class Perjuridica implements BaseEntity {
    constructor(
        public id?: number,
        public vRazsocial?: string,
        public vNomalter?: string,
        public vNumdoc?: string,
        public vEmailper?: string,
        public vTelefono?: string,
        public vFaxperju?: string,
        public vEstado?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public actiecon?: BaseEntity,
        public denuncias?: BaseEntity[],
        public dirperjuris?: BaseEntity[],
        public empleadors?: BaseEntity[],
        public tipdocident?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
