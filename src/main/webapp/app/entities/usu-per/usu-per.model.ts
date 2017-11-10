import { BaseEntity } from './../../shared';

export class UsuPer implements BaseEntity {
    constructor(
        public id?: number,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public usuario?: BaseEntity,
        public usuarioGrupo?: BaseEntity,
        public permiso?: BaseEntity,
        public perfil?: BaseEntity,
    ) {
    }
}
