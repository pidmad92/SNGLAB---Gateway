import { BaseEntity } from '../../../shared/index';

export class EmpresaServicio implements BaseEntity {
    constructor(
        public id?: number,
        public concepto?: string,
        public anioA?: number,
        public anioB?: number,
        public anioC?: number,
        public anioD?: number,
    ) {
        concepto = '';
        anioA = 0;
        anioB = 0;
        anioC = 0;
        anioD = 0;
    }
}
