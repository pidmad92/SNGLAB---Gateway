import { BaseEntity } from './../../shared';

export class UsusolId implements BaseEntity {
    constructor(
        public id?: number,
        public nCodsolic?: number,
        public vCodusu?: string,
    ) {}
}
