import { BaseEntity } from './../../shared';

export class Formperfil implements BaseEntity {
    constructor(
        public id?: number,
        public nCodfperf?: number,
        public vNomcomer?: string,
        public vDesemple?: string,
        public vCodciiu?: string,
        public vPartreg?: string,
        public vGruecono?: string,
        public vSector?: string,
        public vPlancont?: string,
        public vReglabo?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public direccions?: BaseEntity[],
        public hechoInversions?: BaseEntity[],
        public anexoLaborals?: BaseEntity[],
        public unidadNegocios?: BaseEntity[],
        public respInfos?: BaseEntity[],
        public resulNegociacions?: BaseEntity[],
        public participacions?: BaseEntity[],
        public negColectivas?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
