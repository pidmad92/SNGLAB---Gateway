import { BaseEntity } from './../../shared';

export class Provincia {
    constructor(
        public vCoddep?: string,
        public vCodpro?: string,
        public vDespro?: string,
        public vCoddepren?: string,
        public vCodproren?: string,
        public vFlgact?: string,
        // public modulos?: BaseEntity[],
    ) {
    }
}
