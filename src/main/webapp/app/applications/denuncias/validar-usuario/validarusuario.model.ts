import { BaseEntity } from '../../../shared';
import { Usuario } from '../../../entities/usuario';

export class ValidarUsuarioModel {
    constructor(
        public authenticationError: boolean,
        public password: string,
        public rememberMe: boolean,
        public username: string,
        public credentials: any,
    ) {
    }
}
