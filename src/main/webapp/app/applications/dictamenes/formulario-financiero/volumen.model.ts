import { BaseEntity } from '../../../shared/index';

export class Volumen implements BaseEntity {
    constructor(
        public id?: number,
        public producto?: string,
        public unidadMedida?: string,
        public anioAvolumen?: number,
        public anioBvolumen?: number,
        public anioCvolumen?: number,
        public anioDvolumen?: number,
    ) {
        this.producto = '';
        this.unidadMedida = '';
        this.anioAvolumen = 0;
        this.anioBvolumen = 0;
        this.anioCvolumen = 0;
        this.anioDvolumen = 0;
    }
}
