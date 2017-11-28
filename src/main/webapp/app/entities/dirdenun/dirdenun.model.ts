import { BaseEntity } from './../../shared';

export class Dirdenun implements BaseEntity {
    constructor(
        public id?: number,
        public vCoddepart?: string,
        public vCodprovin?: string,
        public vCoddistri?: string,
        public nCodtzona?: number,
        public vDeszona?: string,
        public nCodtipvia?: number,
        public vDesvia?: string,
        public vDireccion?: string,
        public vDircomple?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public denunte?: BaseEntity,
        public tipzona?: BaseEntity,
        public tipvia?: BaseEntity,
        // Agregado para denuncias en linea
        public vCoddepartDes?: string,
        public vCodprovinDes?: string,
        public vCoddistriDes?: string,
    ) {
        this.nFlgactivo = false;
    }
}
