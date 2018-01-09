import { BaseEntity } from '../../../shared/index';

export class Ventas implements BaseEntity {
    constructor(
        public id?: number,
        public producto?: string,
        public unidadMedida?: string,
        public anioAvolumenfisico?: number,
        public anioApromedio?: number,
        public anioBvolumenfisico?: number,
        public anioBpromedio?: number,
        public anioCvolumenfisico?: number,
        public anioCpromedio?: number,
        public anioDvolumenfisico?: number,
        public anioDpromedio?: number,
    ) {
        this.producto = '';
        this.unidadMedida = '';
        this.anioAvolumenfisico = 0;
        this.anioApromedio = 0;
        this.anioBvolumenfisico = 0;
        this.anioBpromedio = 0;
        this.anioCvolumenfisico = 0;
        this.anioCpromedio = 0;
        this.anioDvolumenfisico = 0;
        this.anioDpromedio = 0;
    }
}
