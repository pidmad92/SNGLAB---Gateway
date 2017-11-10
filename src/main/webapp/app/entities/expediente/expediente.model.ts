import { BaseEntity } from './../../shared';

export class Expediente implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public desc?: string,
    ) {
    }
}
