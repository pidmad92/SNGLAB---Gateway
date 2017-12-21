import { BaseEntity } from './../../shared';

export class PerreglabId implements BaseEntity {
    constructor(
        public id?: number,
        public nCodreglab?: number,
        public nCodfperf?: number,
    ) {}
}
