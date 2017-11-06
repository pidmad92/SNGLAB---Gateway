import { BaseEntity } from './../../shared';

export class Grupo implements BaseEntity {
    constructor(
        public id?: number,
        public numCodLocal?: number,
        public numEstGrupo?: number,
        public varNomGrupo?: string,
        public varDescGrupo?: string,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public entidad?: BaseEntity,
        public usuarioGrupos?: BaseEntity[],
    ) {
    }
}
