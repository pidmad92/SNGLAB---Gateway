import { BaseEntity } from './../../shared';

export class TipoEntidad implements BaseEntity {
    constructor(
        public id?: number,
        public varNomTpentidad?: string,
        public varDescTpentidad?: string,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public entidads?: BaseEntity[],
    ) {
    }
}
