import { BaseEntity } from '../../../shared/index';

export class DetalleCuenta implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public anioA?: number,
        public anioB?: number,
        public anioC?: number,
        public anioD?: number,
    ) {
        this.descripcion = '';
        this.anioA = 0;
        this.anioB = 0;
        this.anioC = 0;
        this.anioD = 0;
    }
}
