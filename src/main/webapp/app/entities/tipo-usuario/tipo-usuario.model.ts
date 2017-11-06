import { BaseEntity } from './../../shared';

export class TipoUsuario implements BaseEntity {
    constructor(
        public id?: number,
        public varNomTpusuario?: string,
        public varDescTpusuario?: string,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public usuarios?: BaseEntity[],
    ) {
    }
}
