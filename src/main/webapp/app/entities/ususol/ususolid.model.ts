import { BaseEntity } from './../../shared';

export class UsusolId implements BaseEntity {
    constructor(
        public id?: number,
        public nCodSolic?: number,
        public vCodusu?: string,
    ) {}
}
