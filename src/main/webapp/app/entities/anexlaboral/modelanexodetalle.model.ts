import { BaseEntity } from './../../shared';

export class ModelAnexoDetalle implements BaseEntity {
    constructor(
        public id?: number,
        public nCodanex?: number,
        public vDesanexo?: string,
        public nCantlabo?: number,
    ) {}
}
