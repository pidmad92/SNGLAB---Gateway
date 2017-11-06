import { BaseEntity } from './../../shared';

export class Entidad implements BaseEntity {
    constructor(
        public id?: number,
        public varRsocialEntidad?: string,
        public varRucEntidad?: string,
        public varDirecEntidad?: string,
        public numCodDepartamento?: string,
        public numCodProvincia?: string,
        public numCodDistrito?: string,
        public varTelefEntidad?: string,
        public varFaxEntidad?: string,
        public varEmailEntidad?: string,
        public varPagwebEntidad?: string,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public sCodigoentcer?: string,
        public latitud?: string,
        public longitud?: string,
        public tipoEntidad?: BaseEntity,
        public moduloEntidads?: BaseEntity[],
        public grupos?: BaseEntity[],
    ) {
    }
}
