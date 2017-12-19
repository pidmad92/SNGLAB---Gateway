import { BaseEntity } from './../../shared';

export class Usuario implements BaseEntity {
    constructor(
        public id?: number,
        public varNomUsuario?: string,
        public varLoginUsuario?: string,
        public varInicialUsuario?: string,
        public numEstUsuario?: number,
        public varMotivUsuario?: string,
        public varDocContacto?: string,
        public varNomContacto?: string,
        public varRefContacto?: string,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public varDireccionIp?: string,
        public varMacAddress?: string,
        public varNombrePc?: string,
        public varCodSeguridad?: string,
        public datFecTermino?: any,
        public varPtoControl?: number,
        public tipoUsuario?: BaseEntity,
        public usuarioGrupos?: BaseEntity[],
        public usuarioHorarios?: BaseEntity[],
        public usuPers?: BaseEntity[],
        public pernatural?: BaseEntity,
    ) {
    }
}
