import { BaseEntity } from './../../shared';
import { ModelAnexoDetalle } from './index';

export class ModelAnexo implements BaseEntity {
    constructor(
        public id?: number,
        public nAnio?: number,
        public vDecLegal?: string,
    ) {}
}
