import { BaseEntity } from '../../../shared/index';
import { Contrato } from './contrato.model';

export class Formulario implements BaseEntity {

        constructor(
            public id?: number,
            public anio?: number,
            public listaContrataDirecta?: Contrato[],
            public listaContrataIndirecta1?: Contrato[],
            public listaContrataIndirecta2?: Contrato[],
            public listaContrataNoLaboral?: Contrato[],
            public totalDirecta?: number,
            public totalIndirecta1?: number,
            public totalIndirecta2?: number,
            public totalIndirecta?: number,
            public totalNoLaboral?: number,
            public total?: number,
        ) {
            anio = 0;
            id = 0;
            totalDirecta = 0;
            totalIndirecta1 = 0;
            totalIndirecta2 = 0;
            totalIndirecta = 0;
            totalNoLaboral = 0;
            total = 0;
        }
    }
