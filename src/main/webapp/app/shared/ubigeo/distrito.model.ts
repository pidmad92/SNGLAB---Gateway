import { BaseEntity } from './../../shared';

export class Distrito {
    constructor(
        public vCoddep?: string,
        public vCodpro?: string,
        public vCoddis?: string,
        public vDesdis?: string,
        public vAbrdis?: string,
        public vCodreg?: string,
        public vCodzon?: string,
        public vCoddepren?: string,
        public vCodproren?: string,
        public vCoddisren?: string,
        public vFlgact?: string,
        // public modulos?: BaseEntity[],
    ) {
    }
}
