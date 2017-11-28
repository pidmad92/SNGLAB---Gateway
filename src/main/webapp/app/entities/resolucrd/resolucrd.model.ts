import { BaseEntity } from './../../shared';

export class Resolucrd implements BaseEntity {
    constructor(
        public id?: number,
        public vNumresosd?: string,
        public dFecresosd?: any,
        public vNomemplea?: string,
        public vNomtrabaj?: string,
        public vDireccion?: string,
        public vTelefono?: string,
        public dFecconcil?: any,
        public vHorconcil?: string,
        public dFechanoti?: any,
        public vNumnotifi?: string,
        public fMonMulta?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public tippersona?: BaseEntity,
        public expediente?: BaseEntity,
        public multaconcis?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
