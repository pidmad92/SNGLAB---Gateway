import { BaseEntity } from './../../shared';

export class Departamento {
    constructor(
        public vCoddep?: string,
        public vDesdep?: string,
        public vCoddepren?: string,
        public vFlgact?: string,
        // public modulos?: BaseEntity[],
    ) {
    }
}
